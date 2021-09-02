const router = require('express').Router();

const { authMiddleware } = require('../middlewares');

const { authController } = require('../controllers');

router.post('/',
    authMiddleware.validateLogUserBody,
    authMiddleware.isLogUserPresent,
    authController.getLogUser);

module.exports = router;
