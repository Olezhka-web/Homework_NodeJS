const { globalValidator } = require('../validators');

const ErrorHandler = require('../errors/ErrorHandler');

const errorCodes = require('../constants/codes/errorCodes.enum');
const messages = require('../constants/messages');

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
    }
};
