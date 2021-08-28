const { userService, passwordService } = require('../service');

const errorCodes = require('../constants/codes/errorCodes.enum');

const { userNormalizator } = require('../utils/user.util');

module.exports = {
    getUsers: (req, res, next) => {
        try {
            const userNormalizedUser = req.users.map((user) => userNormalizator(user));

            res.status(errorCodes.OK).json(userNormalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getUser: (req, res, next) => {
        try {
            const userNormalizedUser = userNormalizator(req.user);

            res.status(errorCodes.OK).json(userNormalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const createdUser = await userService.createUser({ ...req.body, password: hashedPassword });

            const userNormalizedUser = userNormalizator(createdUser);

            res.status(errorCodes.CREATED).json(userNormalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: (req, res, next) => {
        try {
            res.status(errorCodes.OK).json(`User with id ${req.user.id} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { id } = req.user;

            await userService.updateUser(id, req.body);

            res.status(errorCodes.OK).json(`User with id ${id} is Update`);
        } catch (e) {
            next(e);
        }
    }
};
