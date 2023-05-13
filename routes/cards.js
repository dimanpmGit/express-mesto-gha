const router = require('express').Router();

const { getAllCards, createCard, deleteCard, likeCard, unlikeCard } = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', unlikeCard);
router.use('/*', (req, res) => res.status(404).send({ message: "Страница не найдена" }));

module.exports = router;