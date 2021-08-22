const router = require('express').Router();

const { authController } = require('../controllers');

router.get('/login', authController.loginPage);
router.post('/login', authController.loginCheck);

module.exports = router;
