const robots = [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        image: "https://robohash.org/1?200x200",
    },
    {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        image: "https://robohash.org/2?200x200",
    },
    {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        image: "https://robohash.org/3?200x200",
    },
    {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        image: "https://robohash.org/4?200x200",
    },
    {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        image: "https://robohash.org/5?200x200",
    },
    {
        id: 6,
        name: "Mrs. Dennis Schulist",
        username: "Leopoldo_Corkery",
        email: "Karley_Dach@jasper.info",
        image: "https://robohash.org/6?200x200",
    },
    {
        id: 7,
        name: "Kurtis Weissnat",
        username: "Elwyn.Skiles",
        email: "Telly.Hoeger@billy.biz",
        image: "https://robohash.org/7?200x200",
    },
    {
        id: 8,
        name: "Nicholas Runolfsdottir V",
        username: "Maxime_Nienow",
        email: "Sherwood@rosamond.me",
        image: "https://robohash.org/8?200x200",
    },
    {
        id: 9,
        name: "Glenna Reichert",
        username: "Delphine",
        email: "Chaim_McDermott@dana.io",
        image: "https://robohash.org/9?200x200",
    },
    {
        id: 10,
        name: "Clementina DuBuque",
        username: "Moriah.Stanton",
        email: "Rey.Padberg@karina.biz",
        image: "https://robohash.org/10?200x200",
    },
];

const roboContainer = document.querySelector(".robo-container");
const searchInput = document.querySelector("input#search");

function displayRobots(robotsList) {
    if (!roboContainer) return;
    // clear the robots container
    roboContainer.innerHTML = "";

    for (let robot of robotsList) {
        // add the robot's image
        const roboImage = document.createElement("img");
        roboImage.classList.add("robo-img");
        roboImage.setAttribute("src", robot.image);
        roboImage.setAttribute("alt", robot.name);

        // add the robot's name
        const roboName = document.createElement("h2");
        roboName.classList.add("robo-name");
        roboName.textContent = robot.name;

        // add the robot's email
        const roboEmail = document.createElement("p");
        roboEmail.classList.add("robo-email");
        roboEmail.textContent = robot.email;

        // create the card for the robot and add all the elements
        const roboCard = document.createElement("div");
        roboCard.classList.add("robo-card");
        roboCard.append(roboImage, roboName, roboEmail);

        // add the card to the dom
        roboContainer.appendChild(roboCard);
    }
}

function displayNotFound() {
    if (!roboContainer) return;
    roboContainer.innerHTML = "";

    const searchResult = searchInput.value;
    const notFoundMessage = document.createElement("h2");
    notFoundMessage.classList.add("not-found-message");
    notFoundMessage.textContent =
        "No results for the search term: " + searchResult;
    roboContainer.appendChild(notFoundMessage);
}

document.addEventListener("DOMContentLoaded", () => {
    displayRobots(robots);
});

searchInput.addEventListener("input", (e) => {
    // filter the robots
    const searchTerm = e.target.value;
    // if the searchTerm is empty it will show everything
    const filteredRobotsList = robots.filter((robot) => {
        return robot.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    console.log(filteredRobotsList.length);
    if (filteredRobotsList.length > 0) {
        displayRobots(filteredRobotsList);
    } else {
        displayNotFound();
    }
});
