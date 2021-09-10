const jwt = require('jsonwebtoken');
const util = require('util');

const verifyPromise = util.promisify(jwt.verify);

const { models } = require('../db');

const { variables } = require('../config');

const { errorCodes, messages, actionTokens } = require('../constants');

const { ErrorHandler } = require('../errors');

module.exports = {
    findUser: (filterObject) => models.User.findOne(filterObject),

    generateTokenPair: () => {
        const access_token = jwt.sign({}, variables.ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, variables.REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? variables.ACCESS_SECRET_KEY : variables.REFRESH_SECRET_KEY;

            await verifyPromise(token, secret);
        } catch (e) {
            throw new ErrorHandler(errorCodes.UNAUTHORIZED, messages.userMessages.INVALID_TOKEN);
        }
    },

    generateActionToken: (actionType) => {
        const secretWord = _getSecretWordForActionToken(actionType);

        return jwt.sign({}, secretWord, { expiresIn: '7d' });
    },

    verifyActionToken: (token, actionType) => {
        const secretWord = _getSecretWordForActionToken(actionType);

        return jwt.verify(token, secretWord);
    }
};

function _getSecretWordForActionToken(actionType) {
    let secretWord = '';

    switch (actionType) {
        case actionTokens.FORGOT_PASSWORD:
            secretWord = variables.FORGOT_PASSWORD_SECRET_KEY;
            break;
        case actionTokens.CHANGE_ADMIN_PASSWORD:
            secretWord = variables.CHANGE_ADMIN_PASSWORD_SECRET_KEY;
            break;
        default:
            throw new ErrorHandler(errorCodes.SERVER_ERROR, messages.userMessages.WRONG_TOKEN_TYPE);
    }

    return secretWord;
}
