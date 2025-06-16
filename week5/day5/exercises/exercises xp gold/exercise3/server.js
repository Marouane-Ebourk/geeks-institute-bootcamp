const express = require('express');
const { v4: uuidv4 } = require('uuid');


const app = express();

app.use(express.json());

let todos = [];

app.post('/api/todos', (req, res) => {
    const { title, completed } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const todo = {
        id: uuidv4(),
        title,
        completed: completed === true
    };
    todos.push(todo);
    res.status(201).json(todo);
});

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});

app.put('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    const { title, completed } = req.body;
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    const deleted = todos.splice(index, 1)[0];
    res.json(deleted);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});