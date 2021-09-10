const router = require('express').Router();

const { authMiddleware, userMiddleware } = require('../middlewares');

const { authController } = require('../controllers');

const { actionTokens } = require('../constants');

router.post('/',
    authMiddleware.validateLogUserBody,
    authMiddleware.isLogUserPresent,
    authController.getLogUser);

router.post('/logout',
    authMiddleware.validateAccessToken,
    authController.getLogoutUser);

router.post('/password/forgot/send',
    userMiddleware.getUserByDynamicParam('email'),
    authController.sendMailForgotPassword);

router.post('/password/forgot/set',
    userMiddleware.validateNewPassword,
    authMiddleware.validateActionToken(actionTokens.FORGOT_PASSWORD),
    authController.changePassword);

router.put('/password/reset',
    userMiddleware.validateResetPassword,
    authMiddleware.validateAccessToken,
    authMiddleware.checkOldPassword,
    authController.changePassword);

router.post('/refresh',
    authMiddleware.validateRefreshToken,
    authController.refresh);

module.exports = router;
