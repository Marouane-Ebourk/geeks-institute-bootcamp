const axios = require('axios');

// in fetch-data.js, require the axios package and use it to make an HTTP GET request to a JSON placeholder API (e.g., https://jsonplaceholder.typicode.com/posts) and fetch a list of posts.

async function fetchPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        response.data.forEach(post => {
            console.log(`Title: ${post.title}`);
        })
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

module.exports = { fetchPosts };