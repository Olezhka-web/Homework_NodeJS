const bcrypt = require('bcrypt');
const ErrorHandler = require('../errors/ErrorHandler');

const messages = require('../constants/messages');
const errorCodes = require('../constants/codes/errorCodes.enum');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.INVALID_EMAIL_OR_PASSWORD);
        }
    }
};
