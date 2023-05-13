const router = require('express').Router();

const { getAllCards, createCard, deleteCard, likeCard, unlikeCard } = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', unlikeCard);
router.use('/*', (req, res) => res.status(404).send({ message: "Страница не найдена" }));

/*router.get('/', wrongUrl);
router.post('/', wrongUrl);
router.put('/', wrongUrl);
router.patch('/', wrongUrl);
router.delete('/', wrongUrl);*/

module.exports = router;