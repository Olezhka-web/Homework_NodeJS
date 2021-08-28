const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware } = require('../middlewares');

router.get('/',
    userMiddleware.validateParams,
    userMiddleware.validateQueryParams,
    userMiddleware.isUsersPresent,
    userController.getUsers);
router.get('/:id',
    userMiddleware.validateParams,
    userMiddleware.isUserPresent,
    userController.getUser);
router.post('/',
    userMiddleware.validateCreateUserBody,
    userMiddleware.checkUniqueEmail,
    userController.createUser);
router.delete('/:id',
    userMiddleware.validateParams,
    userMiddleware.checkDeleteUser,
    userController.deleteUser);
router.put('/:id',
    userMiddleware.validateParams,
    userMiddleware.validateUpdateUserBody,
    userMiddleware.isUserPresent,
    userMiddleware.checkUniqueEmail,
    userController.updateUser);

module.exports = router;
