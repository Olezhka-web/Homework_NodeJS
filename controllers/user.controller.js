const userService = require('../service/user.service');
const errorCodes = require('../constants/errorCodes.enum');

module.exports = {
    getUsers: (req, res, next) => {
        try {
            res.status(errorCodes.OK).json(req.users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await userService.createUser(req.body);

            res.status(errorCodes.CREATED).json(createdUser);
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
    }

};
