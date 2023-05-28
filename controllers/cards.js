/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
// Методы работы с карточками
const Card = require('../models/card');
const AuthError = require('../errors/auth-err');
const NotFoundError = require('../errors/not-found-err');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return Card.findByIdAndRemove(req.params.id);
      }
    })
    .then((card) => {
      if (!card) {
        throw new AuthError('Удалить карточку может только владелец');
      }
      return res.send({ message: 'Карточка удалена' });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
