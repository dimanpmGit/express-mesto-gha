const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getOneUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
