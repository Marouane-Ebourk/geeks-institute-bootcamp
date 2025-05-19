import os
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from jose import jwt, JWTError


SECRET_KEY = os.getenv("SECRET_KEY", "secretkey")
ALGORITHM = os.getenv("ENC_ALGO", "HS256")

PUBLIC_PATHS = [
    ("/login", None),      # All methods
    ("/signup", None),     # All methods
    ("/books", "GET"),     # Only GET /books is public
]


class AuthMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):

        path = request.url.path
        method = request.method

        for public_path, public_method in PUBLIC_PATHS:
            if path == public_path and (method is None or method == public_method):
                return await call_next(request)

        token = request.headers.get("Authorization")
        if not token:
            raise HTTPException(status_code=403, detail="No auth token")
        try:
            payload = jwt.decode(token.split(" ")[1], SECRET_KEY, algorithms=[ALGORITHM])
            request.state.user = payload

        except JWTError:
            raise HTTPException(status_code=403, detail="Invalid token")
        return await call_next(request)