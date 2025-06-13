const express = require("express");
const path = require("path");
const Parser = require("rss-parser");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

let parser = new Parser();

app.get("/feed", async (req, res) => {
    try { 
        let feed = await parser.parseURL("https://thefactfile.org/feed");
        res.json(feed);
    } catch (error) {
        console.error("Error fetching feed:", error);
        res.status(500).send("Error fetching feed");
    }
});

app.get("/" , async (req, res) => {
    try {
        let feed = await parser.parseURL("https://thefactfile.org/feed");
        res.render("pages/index", { posts: feed.items });
    } catch (error) {
        console.error("Error fetching feed:", error);
        res.status(500).send("Error fetching feed");
    }
});

app.get("/search", async (req, res) => {
    try {
        let feed = await parser.parseURL("https://thefactfile.org/feed");

        let searchedCategory = req.query.category
        let searchedTerm = req.query.query;

        let filteredPosts = []

        if (searchedCategory) {
            filteredPosts = feed.items.filter((item) => {
                return item.categories && item.categories.length>0 && item.categories.includes(searchedCategory)
            })
        } else if (searchedTerm) {
            filteredPosts = feed.items.filter((item) => {
                return item.title && item.title.toLowerCase().includes(searchedTerm.toLowerCase())
            })
        }

        let categories = Array.from(
            new Set(feed.items.map(item => item.categories).flat())
        );
        console.log(filteredPosts)

        res.render("pages/search", { 
            posts: filteredPosts,
            categories : categories 
        });

    } catch (error) {
        console.error("Error fetching feed:", error);
        res.status(500).send("Error fetching feed")
    }
})


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
