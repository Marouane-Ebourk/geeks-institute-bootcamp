const axios = require("axios");

function fetchPosts() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    return axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching posts:", error.message);
            throw error;
        });
}

module.exports = {
    fetchPosts,
};
