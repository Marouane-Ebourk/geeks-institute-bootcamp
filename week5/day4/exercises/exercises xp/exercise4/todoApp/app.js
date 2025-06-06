import TodoList from "./todo.js";

const todoList = new TodoList();

todoList.addTask("Do you homeword!");
todoList.addTask("Clean your room!");
todoList.addTask("Buy groceries");
todoList.addTask("solve world hunger");

todoList.markTaskComplete(2);

const tasks = todoList.listTasks();
console.log(tasks)
