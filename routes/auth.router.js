const router = require('express').Router();

const { authMiddleware, userMiddleware, globalMiddleware } = require('../middlewares');

const { authController } = require('../controllers');

const { actionTokens, dynamicParams } = require('../constants');

const { userValidator } = require('../validators');

router.post('/',
    globalMiddleware.validateByDynamicParam(userValidator.logUserValidator),
    authMiddleware.isLogUserPresent,
    authController.getLogUser);

router.post('/logout',
    authMiddleware.validateAccessToken,
    authController.getLogoutUser);

router.post('/password/forgot/send',
    globalMiddleware.validateByDynamicParam(userValidator.passwordValidator),
    userMiddleware.getUserByDynamicParam(dynamicParams.EMAIL),
    authController.sendMailForgotPassword);

router.post('/password/forgot/set',
    globalMiddleware.validateByDynamicParam(userValidator.passwordValidator),
    authMiddleware.validateActionToken(actionTokens.FORGOT_PASSWORD),
    authController.changePassword);

router.put('/password/reset',
    globalMiddleware.validateByDynamicParam(userValidator.resetPasswordValidator),
    authMiddleware.validateAccessToken,
    authMiddleware.checkOldPassword,
    authController.changePassword);

router.post('/refresh',
    authMiddleware.validateRefreshToken,
    authController.refresh);

module.exports = router;
