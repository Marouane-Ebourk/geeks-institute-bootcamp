let currentQ = 1,
    score = 0,
    total = 1;

function loadQuestion() {
    fetch(`/api/quiz/question?qid=${currentQ}`)
        .then((res) => res.json())
        .then((data) => {
            if (!data.question) {
                document.getElementById("quiz").innerHTML = "Quiz finished!";
                document.getElementById(
                    "score"
                ).innerText = `Final Score: ${score}/${total - 1}`;
                return;
            }
            let html = `<div>${data.question}</div>`;
            data.options.forEach((opt) => {
                html += `<div class="option">`;
                html += `<input type="radio" name="opt" id="${opt.id}" value="${opt.id}">`;
                html += `<label for="${opt.id}">${opt.option}</label>`;
                html += `</div>`;
            });
            html += `<button onclick="submitAnswer()">Submit</button>`;
            document.getElementById("quiz").innerHTML = html;
            document.getElementById("feedback").innerText = "";
        });
}

function submitAnswer() {
    const answer = document.querySelector('input[name="opt"]:checked');
    if (!answer) return alert("Select an option!");
    fetch("/api/quiz/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qid: currentQ, answer: answer.value }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.correct) {
                score++;
                document.getElementById("feedback").innerText = "Correct!";
            } else {
                document.getElementById("feedback").innerText = "Wrong!";
            }
            currentQ++;
            total++;
            setTimeout(loadQuestion, 1000);
        });
}

window.onload = loadQuestion;
