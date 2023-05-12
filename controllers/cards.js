// Методы работы с карточками
const Card = require('../models/card');

const errorReturn = (res, err) => {
  if (err.name === 'CastError') {
    return res.status(404).send({ message: 'Карточка не найдена' });
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки' });
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
    .then(card => res.send({ data: card }))
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