const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware, globalMiddleware } = require('../middlewares');

router.get('/',
    userMiddleware.validateUserQueryParams,
    userMiddleware.isUsersPresent,
    userController.getUsers);
router.post('/',
    userMiddleware.validateCreateUserBody,
    userMiddleware.checkUniqueEmail,
    userController.createUser);

router.get('/:id',
    globalMiddleware.validateParams,
    userMiddleware.isUserPresent,
    userController.getUser);
router.delete('/:id',
    globalMiddleware.validateParams,
    userMiddleware.checkDeleteUser,
    userController.deleteUser);
router.put('/:id',
    globalMiddleware.validateParams,
    userMiddleware.validateUpdateUserBody,
    userMiddleware.isUserPresent,
    userMiddleware.checkUniqueEmail,
    userController.updateUser);

module.exports = router;
