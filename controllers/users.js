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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
};
