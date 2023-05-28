/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// app.js — входной файл
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const {
  login,
  createUser,
  getCurrentUser,
} = require('./controllers/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signin', login);
app.post('/signup', createUser);

// авторизация
app.use(auth);
app.get('/users/me', getCurrentUser);
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {});

// Мидлвар централизованной обработки ошибок
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  if (err.code === 11000) {
    err.statusCode = 409;
    err.message = 'Пользователь с таким email уже зарегистрирован';
  }
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});
app.listen(PORT);
