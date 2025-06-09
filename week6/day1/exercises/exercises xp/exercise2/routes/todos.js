const exp = require('express');


const router = exp.Router();

// Sample in-memory database for storing to-do items
const todos = [];

// Get all to-do items
router.get('/', (req, res) => {
    res.json(todos);
});

// Add a new to-do item
router.post('/', (req, res) => {
    const newTodo = req.body;   
    if (!newTodo || !newTodo.title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    newTodo.id = todos.length + 1;
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a to-do item by ID
router.put('/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const updatedTodo = req.body;
    
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index === -1) {
        return res.status(404).json({ error: 'To-do item not found' });
    }
    
    todos[index] = { ...todos[index], ...updatedTodo };
    res.json(todos[index]);
});

// Delete a to-do item by ID
router.delete('/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index === -1) {
        return res.status(404).json({ error: 'To-do item not found' });
    }
    
    todos.splice(index, 1);
    res.status(204).send();
});

module.exports = { router };