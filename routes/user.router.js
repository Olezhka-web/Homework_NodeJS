const router = require('express').Router();

const { userController } = require('../controllers');

const {
    userMiddleware, globalMiddleware, authMiddleware, fileMiddleware
} = require('../middlewares');

const { dynamicParams, roles } = require('../constants');

const { userValidator } = require('../validators');

router.get('/',
    userMiddleware.validateUserQueryParams,
    userController.getUsers);
router.post('/',
    globalMiddleware.validateByDynamicParam(userValidator.createUserValidator),
    fileMiddleware.checkAvatar,
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
    fileMiddleware.checkAvatar,
    authMiddleware.validateAccessToken,
    userMiddleware.getUserByDynamicParam(dynamicParams.ID, dynamicParams.PARAMS, dynamicParams.DB_FIELD),
    userMiddleware.isUserPresent,
    userMiddleware.checkUniqueEmail,
    userController.updateUser);

module.exports = router;
