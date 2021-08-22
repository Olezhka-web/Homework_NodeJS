const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);

module.exports = router;
