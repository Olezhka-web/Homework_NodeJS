const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware, globalMiddleware } = require('../middlewares');

router.get('/',
    userMiddleware.validateUserQueryParams,
    userController.getUsers);
router.post('/',
    userMiddleware.validateCreateUserBody,
    userMiddleware.checkUniqueEmail,
    userController.createUser);

router.get('/:id',
    globalMiddleware.validateParams,
    userMiddleware.getUserByDynamicParam('id', 'params', '_id'),
    userController.getUser);
router.delete('/:id',
    globalMiddleware.validateParams,
    userMiddleware.getUserByDynamicParam('id', 'params', '_id'),
    userMiddleware.checkUserRole(['admin']),
    userController.deleteUser);
router.put('/:id',
    globalMiddleware.validateParams,
    userMiddleware.validateUpdateUserBody,
    userMiddleware.getUserByDynamicParam('id', 'params', '_id'),
    userMiddleware.checkUniqueEmail,
    userController.updateUser);

module.exports = router;
