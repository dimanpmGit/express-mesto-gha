const User = require('../models/user');

class UserFindError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserFindError";
    this.statusCode = 404;
  }
}

class IncorrectUserDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "IncorrectUserDataError";
    this.statusCode = 400;
  }
}

const errorReturn = (res, err) => {
  //console.log(err);
  if (err.name === 'UserFindError') {
    return res.status(404).send({ message: err.message });
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные в методы создания пользователя' });
  }
  else if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Переданы некорректные данные в методы поиска пользователя' });
  }
  else if (err.name === 'IncorrectUserDataError') {
    return res.status(400).send({ message: err.message });
  }
  return res.status(500).send({ message: 'Произошла ошибка' });
};

const getAllUsers = (req, res) => {
  User.find({ })
    .then(user => res.send({ data: user }))
    .catch(err => errorReturn(res, err));
}

const getOneUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        return res.send({ data: user })
      };
      return Promise.reject(new UserFindError('Пользователь не найден'))
    })
    .catch(err => errorReturn(res, err));
};

const checkData = (data) => {
  for ( const [key, value] of Object.entries(data)) {
    //console.log(value);
    //console.log(`${key}: ${value}`);
    if (value && (value.length < 2 || value.length > 30)) {
      //console.log(`${key}: ${value}`);
      return Promise.reject(new IncorrectUserDataError('Переданы некорректные данные в методы обновления профиля'));
    }
  }
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => errorReturn(res, err));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name ,about: about }, { new: true })
    .then(user => {
      if ((name && (name.length < 2 || name.length > 30)) || (about && (about.length < 2 || about.length > 30))) {
        return Promise.reject(new IncorrectUserDataError('Переданы некорректные данные в методы обновления профиля'));
      }
      return res.send({ data: user });
    })
    .catch(err => errorReturn(res, err));
};

const updateAvatar = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name, avatar: avatar }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => errorReturn(res, err));
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar
}