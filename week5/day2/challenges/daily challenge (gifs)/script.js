// In the JS file, create a program to fetch one random gif depending on the search of the user (ie. If the search is “sun”, append on the page one gif with a category of “sun”).


const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
const gifForm = document.forms[0]
const gifContainer = document.querySelector("#gif-container")

const deleteAllBtn = document.querySelector("#delete-all");
deleteAllBtn.addEventListener("click", () => {
    gifContainer.innerHTML = "";
});

gifForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const formData = new FormData(gifForm) 
    const category = formData.get("category").trim()

    if (!category) {
        alert("Please enter a search term.");
        return;
    }

    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${encodeURIComponent(category)}&rating=g`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const gifUrl = data.data.images.original.url;

        // Create a wrapper div for the gif and its delete button
        const gifWrapper = document.createElement("div");
        gifWrapper.classList.add("gif-wrapper")

        const img = document.createElement("img");
        img.src = gifUrl;
        img.alt = `${category} gif`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        deleteBtn.classList.add("delete-btn")
        deleteBtn.addEventListener("click", () => {
            gifWrapper.remove();
        });

        gifWrapper.appendChild(img);
        gifWrapper.appendChild(deleteBtn);

        gifContainer.appendChild(gifWrapper);
    } catch (error) {
        console.error("Error fetching the GIF:", error);
    }
});