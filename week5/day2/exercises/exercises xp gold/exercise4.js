const urls = [
    "https://jsonplaceholder.typicode.com/users",
    // "https://jsonplaceholdersc.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/albums",
];

const getData = async function () {
    try {
        const [users, posts, albums] = await Promise.all(
            urls.map(async (url) => {
                const res = await fetch(url);
                const data = await res.json();
                return data;
            })
        );
        console.log("users", users);
        console.log("posts", posts);
        console.log("albums", albums);
    } catch (err) {
        console.log("ooooooops");
    }
};

getData();
