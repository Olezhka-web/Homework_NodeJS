const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware } = require('../middlewares');

router.get('/', userMiddleware.isUserPresent, userController.getUsers);
router.post('/',
    userMiddleware.checkUserName,
    userMiddleware.checkPassword,
    userMiddleware.checkUniqueEmail,
    userController.createUser);
router.delete('/:id', userMiddleware.checkDeleteUser, userController.deleteUser);
router.put('/:id',
    userMiddleware.isUserPresent,
    userMiddleware.checkUserName,
    userMiddleware.checkPassword,
    userMiddleware.checkUniqueEmail,
    userController.updateUser);

module.exports = router;
