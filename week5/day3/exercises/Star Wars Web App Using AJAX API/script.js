const btn = document.querySelector("button");
const resultDisplay = document.querySelector(".character .result");
const loading = document.querySelector(".loading");

btn.onclick = async (e) => {
    try {
        // clear before starting
        resultDisplay.innerHTML = "";

        showLoading();
        // get the data
        // there are 83 different characters
        const randomID = Math.floor(Math.random() * 83) + 1;
        const response = await fetch(
            "https://www.swapi.tech/api/people/" + randomID
        );
        if (!response.ok) throw Error("error fetching this person");
        const data = await response.json();
        const properties = data.result.properties;
        const name = properties.name;
        const height = properties.height;
        const gender = properties.gender;
        const birthYear = properties.birth_year;
        const homeWorldUrl = properties.homeworld;

        const homeWorld = await fetch(homeWorldUrl)
        const homeWorldData = await homeWorld.json()
        const homeWordProperties = homeWorldData.result.properties
        console.log(homeWordProperties)

        // build the display
        const result = `
            <strong>${name}</strong>
            <p>Height: ${height}</p>
            <p>Gender: ${gender}</p>
            <p>Birth Year: ${birthYear}</p>
            <p>Home World: ${homeWordProperties.name}</p>
        `;
        resultDisplay.innerHTML = result;
    } catch (err) {
        resultDisplay.innnerHTML = "Oh No! That person isnt available.";
        console.error(err);
    } finally {
        hideLoading();
    }
};

const hideLoading = () => loading.classList.add("hide");
const showLoading = () => loading.classList.remove("hide");
