const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usersRouter = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users',usersRouter);

module.exports = app;
