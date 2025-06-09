const express = require('express');
const router = require('./routes/books');

const app = express();

app.use(express.json());

app.use('/books', router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});