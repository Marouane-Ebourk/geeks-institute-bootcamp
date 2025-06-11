const express = require('express');
const tasksRouter = require('./routes/tasksRouter.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tasks', tasksRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
