const router = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

const {
  idValidation,
} = require('../middlewares/validations');

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:id', idValidation, deleteCard);
router.put('/:id/likes', idValidation, likeCard);
router.delete('/:id/likes', idValidation, unlikeCard);

module.exports = router;
