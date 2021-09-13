const { adminValidator } = require('../validators');
const { ErrorHandler } = require('../errors');
const { errorCodes, messages } = require('../constants');

module.exports = {
    validateCreateAdminBody: (req, res, next) => {
        try {
            const { error } = adminValidator.createAdminValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAdminRole: (rolesArr = []) => (req, res, next) => {
        try {
            const { loggedUser } = req;

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
};
