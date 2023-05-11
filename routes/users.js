const router = require('express').Router();
const { getAllUsers, getOneUser, createUser } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getOneUser);
router.post('/users', createUser);

module.exports = router;