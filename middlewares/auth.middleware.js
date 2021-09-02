const { ErrorHandler } = require('../errors');

const { messages, errorCodes } = require('../constants');

const { authService } = require('../service');

const { userValidator } = require('../validators');

module.exports = {
    validateLogUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.logUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.INVALID_EMAIL_OR_PASSWORD);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isLogUserPresent: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await authService.findUser({ email });

            if (!userByEmail) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.INVALID_EMAIL_OR_PASSWORD);
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    }

};
