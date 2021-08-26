const ErrorHandler = require('../errors/ErrorHandler');

const { userService } = require('../service');

const { User } = require('../db/models');

const messages = require('../constants/messages');
const errorCodes = require('../constants/codes/errorCodes.enum');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { name, email } = req.query;

            if (!name && !email) {
                const users = await userService.findUsers();

                req.users = users;
                return next();
            }

            if (name) {
                const usersByName = await userService.findUsers({ name });

                req.users = usersByName;
                return next();
            }

            const usersByEmail = await userService.findUsers({ email });

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
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.NO_NAME);
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
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.NO_EMAIL);
            }

            const checkEmail = email.includes('@');

            if (!checkEmail) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.INVALID_EMAIL);
            }

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.REPEAT_EMAIL);
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
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.TOO_WEAK_PASSWORD);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkDeleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.INVALID_ID);
            }

            const user = await userService.findUserById(id);

            if (!user) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.NO_USER);
            }

            await userService.deleteUser({ _id: id });

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.INVALID_ID);
            }

            const user = await userService.findUserById(id);

            if (!user) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.NO_USER);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
