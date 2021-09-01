const { userService, passwordService } = require('../service');

const { errorCodes } = require('../constants');

const { userUtil } = require('../utils');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers(req.query);

            const userNormalizedUser = users.map((user) => userUtil.userNormalizator(user));

            res.json(userNormalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getUser: (req, res, next) => {
        try {
            const userNormalizedUser = userUtil.userNormalizator(req.user);

            res.json(userNormalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const createdUser = await userService.createUser({ ...req.body, password: hashedPassword });

            const userNormalizedUser = userUtil.userNormalizator(createdUser);

            res.status(errorCodes.CREATED).json(userNormalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { _id } = req.user;

            await userService.deleteUser({ _id });

            res.status(errorCodes.DELETED).json(`User with id ${_id} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { id } = req.user;

            await userService.updateUser(id, req.body);

            res.status(errorCodes.CREATED).json(`User with id ${id} is Update`);
        } catch (e) {
            next(e);
        }
    }
};
