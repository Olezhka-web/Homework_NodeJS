const { globalValidator } = require('../validators');
const { ErrorHandler } = require('../errors');
const { messages, errorCodes } = require('../constants');

module.exports = {
    validateParams: (req, res, next) => {
        try {
            const { error } = globalValidator.paramsValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.INVALID_ID);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateByDynamicParam: (validator, searchIn = 'body') => (req, res, next) => {
        try {
            const { error } = validator.validate(req[searchIn]);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
