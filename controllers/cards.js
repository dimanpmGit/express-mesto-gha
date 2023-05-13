// Методы работы с карточками
const Card = require('../models/card');

class IncorrectCardDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "IncorrectCardDataError";
    this.statusCode = 400;
  }
}

const errorReturn = (res, err) => {
  console.log(err);
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Карточка не найдена' });
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки' });
  }
  else if (err.name === 'IncorrectCardDataError') {
    return res.status(400).send({ message: err.message });
  }
  return res.status(500).send({ message: 'Произошла ошибка' });
};

const getAllCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => errorReturn(res, err));
}

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => errorReturn(res, err));
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => errorReturn(res, err));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card =>
      /*if ((name && (name.length < 2 || name.length > 30)) || (about && (about.length < 2 || about.length > 30))) {
        return Promise.reject(new IncorrectCardDataError('Переданы некорректные данные карточки при лайке'));
      };*/
      res.send({ data: card })
    )
    .catch(err => errorReturn(res, err));
};

const unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(card => res.send({ data: card }))
    .catch(err => errorReturn(res, err));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard
};