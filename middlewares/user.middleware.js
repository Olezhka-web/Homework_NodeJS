const ErrorHandler = require('../errors/ErrorHandler');

const { userService } = require('../service');

const { User } = require('../db/models');

const messages = require('../constants/messages');
const errorCodes = require('../constants/codes/errorCodes.enum');

const { userValidator } = require('../validators');

module.exports = {
    validateUserQueryParams: (req, res, next) => {
        try {
            const { error } = userValidator.queryParamsUserValidator.validate(req.query);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.INVALID_SEARCH_OPTION);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUsersPresent: async (req, res, next) => {
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

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.REPEAT_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCreateUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUpdateUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbFilled = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbFilled]: value });

            if (!user) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.NOT_FOUND);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
