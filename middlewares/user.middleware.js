const { ErrorHandler } = require('../errors');

const { models } = require('../db');

const { messages, errorCodes } = require('../constants');

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

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await models.User.findOne({ email });

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

    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await models.User.findOne({ [dbField]: value });

            if (!user) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.NOT_FOUND);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (rolesArr = []) => (req, res, next) => {
        try {
            const { user, loggedUser } = req;

            if (user._id.toString() === loggedUser._id.toString()) {
                req.deleteByUser = true;
                return next();
            }

            if (!rolesArr.length) {
                return next();
            }

            if (!rolesArr.includes(loggedUser.role)) {
                throw new ErrorHandler(errorCodes.FORBIDDEN, messages.userMessages.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (req, res, next) => {
        try {
            const { user, loggedUser } = req;

            if (user._id.toString() !== loggedUser._id.toString()) {
                throw new ErrorHandler(errorCodes.FORBIDDEN, messages.userMessages.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateNewPassword: (req, res, next) => {
        try {
            const { error } = userValidator.passwordValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateResetPassword: (req, res, next) => {
        try {
            const { error } = userValidator.resetPasswordValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
