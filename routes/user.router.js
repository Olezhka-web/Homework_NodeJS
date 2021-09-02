const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware, globalMiddleware } = require('../middlewares');

const { dynamicParams } = require('../constants');

router.get('/',
    userMiddleware.validateUserQueryParams,
    userController.getUsers);
router.post('/',
    userMiddleware.validateCreateUserBody,
    userMiddleware.checkUniqueEmail,
    userController.createUser);

router.get('/:id',
    globalMiddleware.validateParams,
    userMiddleware.getUserByDynamicParam(dynamicParams.ID, dynamicParams.PARAMS, dynamicParams.DB_FIELD),
    userController.getUser);
router.delete('/:id',
    globalMiddleware.validateParams,
    userMiddleware.getUserByDynamicParam(dynamicParams.ID, dynamicParams.PARAMS, dynamicParams.DB_FIELD),
    userMiddleware.checkUserRole(['admin']),
    userController.deleteUser);
router.put('/:id',
    globalMiddleware.validateParams,
    userMiddleware.validateUpdateUserBody,
    userMiddleware.getUserByDynamicParam(dynamicParams.ID, dynamicParams.PARAMS, dynamicParams.DB_FIELD),
    userMiddleware.checkUniqueEmail,
    userController.updateUser);

module.exports = router;
