const User = require('../db/models/User');
const ErrorHandler = require('../errors/ErrorHandler');
const userService = require('../service/user.service');
const messages = require('../messages/user.messages');
const errorCodes = require('../constants/errorCodes.enum');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { name, email } = req.query;
            if (!name && !email) {
                const users = await userService.findUsers();

                if (users.length === 0) {
                    throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_USER);
                }
                req.users = users;

                return next();
            }

            if (name) {
                const usersByName = await userService.findUsers({ name });

                if (usersByName.length === 0) {
                    throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_USER);
                }
                req.users = usersByName;

                return next();
            }
            const usersByEmail = await userService.findUsers({ email });
            if (usersByEmail.length === 0) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_USER);
            }

            req.users = usersByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserName: (req, res, next) => {
        try {
            const { name } = req.body;

            if (!name || name === '') {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_NAME);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email || email === '') {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_EMAIL);
            }
            const checkEmail = email.includes('@');
            if (!checkEmail) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.INVALID_EMAIL);
            }
            const userByEmail = await User.findOne({ email });
            if (userByEmail) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.REPEAT_EMAIL);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkPassword: (req, res, next) => {
        try {
            const { password } = req.body;
            if (password.length < 6) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.TOO_WEAK_PASSWORD);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkDeleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id || id === '') {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.INVALID_ID);
            }
            const user = await userService.findUserById(id);
            if (!user) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_USER);
            }
            await userService.deleteUser({ _id: id });
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
