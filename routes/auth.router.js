const router = require('express').Router();

const { authMiddleware } = require('../middlewares');

const { authController } = require('../controllers');

router.post('/',
    authMiddleware.validateLogUserBody,
    authMiddleware.isLogUserPresent,
    authController.getLogUser);

router.post('/logout',
    authMiddleware.validateAccessToken,
    authController.getLogoutUser);

router.post('/refresh',
    authMiddleware.validateRefreshToken,
    authController.refresh);

module.exports = router;
