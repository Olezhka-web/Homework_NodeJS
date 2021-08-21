const router = require('express').Router();

const { authController } = require('../controllers');

router.get('/login', authController.loginPage);
router.post('/login', authController.loginCheck);
router.get('/register', authController.registerPage);
router.post('/register', authController.registerCheck);

module.exports = router;
