/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  BAD_REQUEST,
  NOT_FOUND,
} = require('../utils/constants');

const { errorReturn } = require('../utils/utils');
const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({ })
    .then((user) => res.send(user))
    .catch((err) => errorReturn(res, err));
};

const getOneUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => errorReturn(res, err));
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => errorReturn(res, err));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(BAD_REQUEST).send({ message: 'Указан некорректный id пользователя' });
      }
      return res.send(user);
    })
    .catch((err) => errorReturn(res, err));
};

const updateAvatar = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => errorReturn(res, err));
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({
          _id: user._id,
        });
    })
    .catch((err) => {
      res.status(401).send({
        message: err.message,
      });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => errorReturn(res, err));
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
