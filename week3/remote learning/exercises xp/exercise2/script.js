const colorDisplay = document.getElementById("color-display");
const optionsDiv = document.getElementById("options");
const feedbackDiv = document.getElementById("feedback");
const timerDiv = document.getElementById("timer");
const difficultySelect = document.getElementById("difficulty");
const resetBtn = document.getElementById("reset");
const hardInputDiv = document.getElementById("hard-input");
const submitHardBtn = document.getElementById("submit-hard");
const rgbInput = document.getElementById("rgb-input");

let correctColor = null;
let timer = null;
let timeLeft = 0;

// generate a random color
function randomColor() {
    return [0, 0, 0].map(() => Math.floor(Math.random() * 256));
}

function rgbToString(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function setFeedback(msg, color) {
    feedbackDiv.textContent = msg;
    feedbackDiv.style.color = color || "#333";
}

function startTimer(seconds, callback) {
    clearInterval(timer);
    timeLeft = seconds;
    timerDiv.textContent = `Next color in: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = `Next color in: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerDiv.textContent = "";
            callback();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timerDiv.textContent = "";
}

function setupGame() {
    stopTimer();
    setFeedback("", "#333");
    optionsDiv.innerHTML = "";
    hardInputDiv.style.display = "none";
    let difficulty = difficultySelect.value;
    correctColor = randomColor();

    // Show the color
    colorDisplay.style.background = rgbToString(correctColor);

    if (difficulty === "easy" || difficulty === "medium") {
        let numOptions = difficulty === "easy" ? 3 : 6;
        let options = [];
        let correctIdx = Math.floor(Math.random() * numOptions);
        for (let i = 0; i < numOptions; i++) {
            if (i === correctIdx) {
                options.push(rgbToString(correctColor));
            } else {
                let col;
                do {
                    col = randomColor();
                } while (
                    col.toString() === correctColor.toString() ||
                    options.some((o) => o === rgbToString(col))
                );
                options.push(rgbToString(col));
            }
        }
        options.forEach((rgbStr, idx) => {
            let btn = document.createElement("button");
            btn.className = "swatch";
            btn.style.background = "#fff";
            btn.style.color = "#222";
            btn.style.border = "2px solid #ccc";
            btn.style.width = "auto";
            btn.style.height = "auto";
            btn.style.padding = "8px 12px";
            btn.style.fontWeight = "bold";
            btn.textContent = rgbStr;
            btn.addEventListener("click", () => {
                if (rgbStr === rgbToString(correctColor)) {
                    setFeedback("Correct!", "green");
                    startTimer(5, setupGame);
                } else {
                    setFeedback("Try again!", "red");
                }
            });
            optionsDiv.appendChild(btn);
        });
    } else if (difficulty === "hard") {
        hardInputDiv.style.display = "block";
        rgbInput.value = "";
        submitHardBtn.onclick = () => {
            let val = rgbInput.value.trim().replace(/\s+/g, "");
            let correctStr = rgbToString(correctColor).replace(/\s+/g, "");
            if (!/^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/i.test(val)) {
                setFeedback("Enter RGB like: rgb(123,45,67)", "red");
                return;
            }
            if (val.toLowerCase() === correctStr.toLowerCase()) {
                setFeedback("Correct!", "green");
                startTimer(5, setupGame);
            } else {
                setFeedback("Wrong! Try again.", "red");
            }
        };
    }
}

difficultySelect.addEventListener("change", setupGame);
resetBtn.addEventListener("click", setupGame);

window.onload = setupGame;
