const router = require('express').Router();

const { adminController, authController } = require('../controllers');
const {
    userMiddleware, adminMiddleware, authMiddleware, globalMiddleware
} = require('../middlewares');
const { roles, actionTokens } = require('../constants');
const { adminValidator, userValidator } = require('../validators');

router.post('/create',
    globalMiddleware.validateByDynamicParam(adminValidator.createAdminValidator),
    adminMiddleware.validateCreateAdminBody,
    userMiddleware.checkUniqueEmail,
    authMiddleware.validateAccessToken,
    adminMiddleware.checkAdminRole([roles.MAIN_ADMIN]),
    adminController.createAdminUser);

router.post('/password/set',
    globalMiddleware.validateByDynamicParam(userValidator.passwordValidator),
    authMiddleware.validateActionToken(actionTokens.CHANGE_ADMIN_PASSWORD),
    authController.changePassword);

module.exports = router;
