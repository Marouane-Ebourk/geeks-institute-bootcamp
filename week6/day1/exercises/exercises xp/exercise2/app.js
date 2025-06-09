const express = require('express');
const { router: todoRouter } = require('./routes/todos.js');

const app = express();

app.use(express.json());
app.use('/todos', todoRouter);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});