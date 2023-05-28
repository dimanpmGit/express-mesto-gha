/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
// app.js — входной файл
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const {
  login,
  createUser,
} = require('./controllers/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const {
  signupValidation,
  signinValidation,
} = require('./middlewares/validations.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

// авторизация
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {});

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

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
