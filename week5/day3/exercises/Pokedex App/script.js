const randomBtn = document.querySelector(".random");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const imgDisplay = document.querySelector(".img-display");
const imgDisplayContent = imgDisplay.querySelector(".content");
const imgLoading = imgDisplay.querySelector(".loading");

const statsDisplay = document.querySelector(".stats-display");
const statsDisplayContent = statsDisplay.querySelector(".content");
const statsLoading = statsDisplay.querySelector(".loading");

const baseUrl = "https://pokeapi.co/api/v2/pokemon";
// almost 1000 pokemons

let currentPokemonId = null;

randomBtn.onclick = async (e) => {
    const randomId = Math.floor(Math.random() * 1000 + 1);
    displayPokemon(randomId);
};

prevBtn.onclick = (e) => {
    displayPokemon(currentPokemonId - 1);
};
nextBtn.onclick = (e) => {
    displayPokemon(currentPokemonId + 1);
};

const showStatsLoading = () => statsLoading.classList.remove("hide");
const hideStatsLoading = () => statsLoading.classList.add("hide");
const showImgLoading = () => imgLoading.classList.remove("hide");
const hideImgLoading = () => imgLoading.classList.add("hide");

async function displayPokemon(pokemonId) {
    imgDisplayContent.innerHTML = "";
    statsDisplayContent.innerHTML = "";
    showStatsLoading();
    showImgLoading();

    try {
        const res = await fetch(`${baseUrl}/${pokemonId}`);
        if (!res.ok) throw Error(`Failed to fetch pokemon with id ${id}`);
        const data = await res.json();

        const name = data.name;
        const id = data.id;
        const height = data.height;
        const weight = data.weight;
        const imageUrl = data.sprites.front_shiny;

        currentPokemonId = id ? id : null;

        stats = `
            <h2 style="margin-bottom: .5rem;">${name}</h2>
            <p>Pokemon #${id}</p>
            <p>Height ${height}cm </p>
            <p>Weight ${weight}gr </p>
        `;
        statsDisplayContent.innerHTML = stats;

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = `pokemon ${name}`;
        img.onload = hideImgLoading;
        imgDisplayContent.appendChild(img);
    } catch (err) {
        imgDisplayContent.innerHTML = "";
        statsDisplayContent.innerHTML = "";
        console.error(err);
    } finally {
        hideStatsLoading();
    }
}
