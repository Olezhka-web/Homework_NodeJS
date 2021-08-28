const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware } = require('../middlewares');

router.get('/',
    userMiddleware.validateUserQueryParams,
    userMiddleware.isUsersPresent,
    userController.getUsers);
router.post('/',
    userMiddleware.validateCreateUserBody,
    userMiddleware.checkUniqueEmail,
    userController.createUser);

router.get('/:id',
    userMiddleware.validateUserParams,
    userMiddleware.isUserPresent,
    userController.getUser);
router.delete('/:id',
    userMiddleware.validateUserParams,
    userMiddleware.checkDeleteUser,
    userController.deleteUser);
router.put('/:id',
    userMiddleware.validateUserParams,
    userMiddleware.validateUpdateUserBody,
    userMiddleware.isUserPresent,
    userMiddleware.checkUniqueEmail,
    userController.updateUser);

module.exports = router;
