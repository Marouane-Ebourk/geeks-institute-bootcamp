const express = require('express');
const path = require('path');
const usersRouter = require('./routes/usersRouter.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/', usersRouter)

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
})

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
