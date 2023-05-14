// app.js — входной файл
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '645cad16710090480993ace5',
  };
  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
});
app.listen(PORT);
