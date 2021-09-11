const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware, globalMiddleware, authMiddleware } = require('../middlewares');

const { dynamicParams, roles } = require('../constants');

const { userValidator } = require('../validators');

router.get('/',
    userMiddleware.validateUserQueryParams,
    userController.getUsers);
router.post('/',
    globalMiddleware.validateByDynamicParam(userValidator.createUserValidator),
    userMiddleware.checkUniqueEmail,
    userController.createUser);

router.get('/:id',
    globalMiddleware.validateParams,
    userMiddleware.getUserByDynamicParam(dynamicParams.ID, dynamicParams.PARAMS, dynamicParams.DB_FIELD),
    userController.getUser);
router.delete('/:id',
    globalMiddleware.validateParams,
    authMiddleware.validateAccessToken,
    userMiddleware.getUserByDynamicParam(dynamicParams.ID, dynamicParams.PARAMS, dynamicParams.DB_FIELD),
    userMiddleware.checkUserRole([roles.ADMIN]),
    userController.deleteUser);
router.put('/:id',
    globalMiddleware.validateParams,
    globalMiddleware.validateByDynamicParam(userValidator.updateUserValidator),
    authMiddleware.validateAccessToken,
    userMiddleware.getUserByDynamicParam(dynamicParams.ID, dynamicParams.PARAMS, dynamicParams.DB_FIELD),
    userMiddleware.isUserPresent,
    userMiddleware.checkUniqueEmail,
    userController.updateUser);

module.exports = router;
