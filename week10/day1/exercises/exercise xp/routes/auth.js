import express from "express";
import User from "../models/User.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from "../utils/jwt.js";

const router = express.Router();

// Validation middleware
const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            error: "Username, email, and password are required",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            error: "Password must be at least 6 characters long",
        });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "Please enter a valid email address",
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required",
        });
    }

    next();
};

// Register endpoint
router.post("/register", validateRegistration, async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(400).json({
                error: "User with this email or username already exists",
            });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Generate tokens
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save();

        // Set tokens as HTTP cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        res.status(201).json({
            message: "User registered successfully",
            user: user.toJSON(),
            tokens: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: "User with this email or username already exists",
            });
        }

        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(400).json({
                error: "Validation error",
                details: messages,
            });
        }

        console.error("Registration error:", error);
        res.status(500).json({
            error: "Internal server error during registration",
        });
    }
});

// Login endpoint
router.post("/login", validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        // Generate tokens
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save();

        // Set tokens as HTTP cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        res.json({
            message: "Login successful",
            user: user.toJSON(),
            tokens: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            error: "Internal server error during login",
        });
    }
});

// Refresh token endpoint
router.post("/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                error: "Refresh token not provided",
            });
        }

        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken);

        // Find user and check if refresh token matches
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({
                error: "Invalid refresh token",
            });
        }

        // Generate new access token
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
        };

        const newAccessToken = generateAccessToken(payload);

        // Set new access token as cookie
        res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);

        res.json({
            message: "Token refreshed successfully",
            accessToken: newAccessToken,
        });
    } catch (error) {
        console.error("Token refresh error:", error);
        res.status(403).json({
            error: "Invalid or expired refresh token",
        });
    }
});

// Logout endpoint
router.post("/logout", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            // Find user and remove refresh token
            const decoded = verifyRefreshToken(refreshToken);
            const user = await User.findById(decoded.userId);

            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }

        // Clear cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json({
            message: "Logged out successfully",
        });
    } catch (error) {
        // Even if there's an error, we still clear the cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json({
            message: "Logged out successfully",
        });
    }
});

// Check authentication status
router.get("/me", async (req, res) => {
    try {
        const token =
            req.cookies.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                error: "No token provided",
                authenticated: false,
            });
        }

        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({
                error: "User not found",
                authenticated: false,
            });
        }

        res.json({
            authenticated: true,
            user: user.toJSON(),
        });
    } catch (error) {
        res.status(403).json({
            error: "Invalid token",
            authenticated: false,
        });
    }
});

export default router;
