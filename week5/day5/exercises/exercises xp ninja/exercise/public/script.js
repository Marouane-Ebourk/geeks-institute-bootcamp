let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedChoice = null;

const questionDiv = document.getElementById("question");
const choicesDiv = document.getElementById("choices");
const submitBtn = document.getElementById("submit-btn");
const feedbackDiv = document.getElementById("feedback");
const scoreDiv = document.getElementById("score");

fetch("/api/questions")
    .then((res) => res.json())
    .then((data) => {
        questions = data;
        showQuestion();
    });

function showQuestion() {
    feedbackDiv.textContent = "";
    submitBtn.disabled = true;
    selectedChoice = null;
    if (currentQuestion >= questions.length) {
        questionDiv.textContent = "Quiz Finished!";
        choicesDiv.innerHTML = "";
        submitBtn.style.display = "none";
        scoreDiv.textContent = `Your final score: ${score} / ${questions.length}`;
        return;
    }
    const q = questions[currentQuestion];
    questionDiv.textContent = q.question;
    choicesDiv.innerHTML = "";
    q.choices.forEach((choice, idx) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "choice";
        radio.value = idx;
        radio.onclick = () => {
            selectedChoice = idx;
            submitBtn.disabled = false;
        };
        label.appendChild(radio);
        label.appendChild(document.createTextNode(choice));
        choicesDiv.appendChild(label);
    });
}

submitBtn.onclick = () => {
    const q = questions[currentQuestion];
    if (selectedChoice == q.answer) {
        feedbackDiv.textContent = "Correct!";
        feedbackDiv.style.color = "green";
        score++;
    } else {
        feedbackDiv.textContent = `Wrong! Correct answer: ${
            q.choices[q.answer]
        }`;
        feedbackDiv.style.color = "red";
    }
    scoreDiv.textContent = `Score: ${score} / ${questions.length}`;
    submitBtn.disabled = true;
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1200);
};
