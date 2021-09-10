const router = require('express').Router();

const { adminController, authController } = require('../controllers');

const { userMiddleware, adminMiddleware, authMiddleware } = require('../middlewares');

const { roles, actionTokens } = require('../constants');

router.post('/create',
    adminMiddleware.validateCreateAdminBody,
    userMiddleware.checkUniqueEmail,
    authMiddleware.validateAccessToken,
    adminMiddleware.checkAdminRole([roles.MAIN_ADMIN]),
    adminController.createAdminUser);

router.post('/password/set',
    userMiddleware.validateNewPassword,
    authMiddleware.validateActionToken(actionTokens.CHANGE_ADMIN_PASSWORD),
    authController.changePassword);

module.exports = router;
