const router = require('express').Router();

const { userController } = require('../controllers');
const {
    isUserPresent, checkUniqueEmail, checkPassword, checkUserName, checkDeleteUser
} = require('../middlewares/user.middleware');

router.get('/', isUserPresent, userController.getUsers);
router.post('/', checkUserName, checkUniqueEmail, checkPassword, userController.createUser);
router.delete('/:id', checkDeleteUser, userController.deleteUser);

module.exports = router;
