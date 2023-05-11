// app.js — входной файл
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use(bodyParser.json());
app.use('/', usersRouter);


// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
})

app.listen(PORT, () => {
  //console.log(`App listening on port ${PORT}`);
});