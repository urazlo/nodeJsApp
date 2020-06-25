const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/user');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users', userController.getUsers);

app.post('/users', userController.createUser);

app.get('/users/:id', userController.getUser);

app.delete('/users/:id', userController.deleteUser);

app.patch('/users/:id', userController.updateUser);

module.exports = app;
