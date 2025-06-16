// Part I
setTimeout(function() {
    alert("Hello World");
}, 2000);

// Part II
setTimeout(function() {
    const container = document.getElementById("container");
    if (container) {
        const p = document.createElement("p");
        p.textContent = "Hello World";
        container.appendChild(p);
    }
}, 2000);

// Part III
let count = 0;
const intervalId = setInterval(function() {
    const container = document.getElementById("container");
    if (container) {
        const p = document.createElement("p");
        p.textContent = "Hello World";
        container.appendChild(p);
        count++;
        if (count >= 5) {
            clearInterval(intervalId);
        }
    }
}, 2000);

// Optional: If you want to clear interval on button click as well
// const button = document.querySelector("button");
// if (button) {
//   button.addEventListener("click", function() {
//     clearInterval(intervalId);
//   });
// }