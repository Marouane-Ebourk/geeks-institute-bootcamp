class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
}

class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(description) {
        const task = new Task(description);
        this.tasks.push(task);
    }

    markTaskComplete(index) {
        if (this.tasks[index]) {
            this.tasks[index].completed = true;
        }
    }

    listTasks() {
        return this.tasks.map((task, idx) => ({
            index: idx,
            description: task.description,
            completed: task.completed
        }));
    }
}


export default TodoList;