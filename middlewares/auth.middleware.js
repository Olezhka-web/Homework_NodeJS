const { ErrorHandler } = require('../errors');

const {
    messages, errorCodes, header, tokenTypes
} = require('../constants');

const { authService, passwordService } = require('../service');

const { models } = require('../db');

module.exports = {
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
    },

    validateAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(header.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, messages.userMessages.NO_TOKEN);
            }

            await authService.verifyToken(access_token);

            const tokenFromDB = await models.OAuth.findOne({ access_token }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, messages.userMessages.INVALID_TOKEN);
            }

            req.loggedUser = tokenFromDB.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateActionToken: (tokenType) => async (req, res, next) => {
        try {
            const action_token = req.get(header.AUTHORIZATION);

            if (!action_token) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, messages.userMessages.NO_TOKEN);
            }

            await authService.verifyActionToken(action_token, tokenType);

            const tokenFromDB = await models.ActionToken.findOne({ action_token }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, messages.userMessages.INVALID_TOKEN);
            }

            req.loggedUser = tokenFromDB.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkOldPassword: async (req, res, next) => {
        try {
            const { loggedUser, body: { oldPassword } } = req;

            await passwordService.compare(loggedUser.password, oldPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(header.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, messages.userMessages.NO_TOKEN);
            }

            await authService.verifyToken(refresh_token, tokenTypes.TOKEN_TYPE_REFRESH);

            const tokenFromDB = await models.OAuth.findOne({ refresh_token }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, messages.userMessages.INVALID_TOKEN);
            }

            req.loggedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
