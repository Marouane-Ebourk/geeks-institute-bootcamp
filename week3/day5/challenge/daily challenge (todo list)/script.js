// getting all required elements
const form = document.forms[0];
const inputBox = form.querySelector("input");
const addBtn = form.querySelector("button");
const listTasks = document.querySelector(".listTasks");
const deleteAllBtn = document.querySelector(".footer button");
const tasks = [];

// activate the add button only if task is filled
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value;
    if (userEnteredValue.trim() != "") {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
};

showTasks();

// add a task
form.onsubmit = (e) => {
    e.preventDefault();
    let userEnteredValue = inputBox.value;
    if (userEnteredValue.trim() != "") {
        tasks.push({
            text: userEnteredValue,
            done: false,
        });
        showTasks();
        addBtn.classList.remove("active");
    }
};

function showTasks() {
    // activate clear button if tasks are full
    if (tasks.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }
    // create the tasks html
    let newLiTag = "";
    tasks.forEach((task, index) => {
        const text = task.text;
        newLiTag += `
        <li>
          <input type="checkbox" ${
              task.done ? "checked" : ""
          } name="task-${index}" value="${text}" id="task-${index}" onchange="handleCheckedTask(event, ${index})" />
          <label for="task-${index}">${text}</label>
          <span class="icon" onclick="deleteTask(${index})">
            <i class="fas fa-trash"></i>
          </span>
        </li>`;
    });
    listTasks.innerHTML = newLiTag;
    inputBox.value = "";
}


// handle checked task
function handleCheckedTask(e, index) {
    tasks[index].done = e.target.value;
}
// delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    showTasks();
}

// delete all tasks
deleteAllBtn.onclick = () => {
    // clear tasks varriable
    tasks.splice(0, tasks.length);
    showTasks();
};
