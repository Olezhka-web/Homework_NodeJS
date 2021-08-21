const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

module.exports = router;
