/* eslint-disable linebreak-style */
// Методы работы с карточками
const Card = require('../models/card');
const { errorReturn } = require('../utils/utils');

const {
  NOT_FOUND,
} = require('../utils/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => errorReturn(res, err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => errorReturn(res, err));
};

const deleteCard = (req, res) => {
  //if (req.user._id !== )
  Card.findById(req.params.cardId)
    .then((card) => {
      /*if (card.owner.id === req.user._id) {
        console.log('Ура');
      } else {
        console.log('Не ура');
      }
      console.log(card.owner.id);
      console.log(req.user._id);*/
      return res.send(card);
    })
  /*Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.send(card);
    })*/
    .catch((err) => errorReturn(res, err));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => errorReturn(res, err));
};

const unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => errorReturn(res, err));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
