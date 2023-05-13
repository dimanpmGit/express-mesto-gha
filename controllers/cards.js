// Методы работы с карточками
const Card = require('../models/card');

class CardFindError extends Error {
  constructor(message) {
    super(message);
    this.name = "CardFindError";
    this.statusCode = 404;
  }
}

const errorReturn = (res, err) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Переданы некорректные данные карточки при лайке' });
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки' });
  }
  else if (err.name === 'CardFindError') {
    return res.status(404).send({ message: err.message });
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
    .then(card => {
      if (card) {
        return res.send({ data: card })
      };
      return Promise.reject(new CardFindError('Карточка не найден'));
      res.send({ data: card })
    })
    .catch(err => errorReturn(res, err));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => {
      if (card) {
        return res.send({ data: card })
      };
      return Promise.reject(new CardFindError('Карточка не найден'));
      res.send({ data: card });
    })
    .catch(err => errorReturn(res, err));
};

const unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(card => {
      if (card) {
        return res.send({ data: card })
      };
      return Promise.reject(new CardFindError('Карточка не найден'));
      res.send({ data: card })
    })
    .catch(err => errorReturn(res, err));
};

/*const wrongUrl = (req, res) => {
  return res.status(404).send({ message: 'Указан неверный путь' });
}*/

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
  //wrongUrl
};