const { ErrorHandler } = require('../errors');

const { messages, errorCodes, header } = require('../constants');

const { authService } = require('../service');

const { userValidator } = require('../validators');

const { models } = require('../db');

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

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(header.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, messages.userMessages.NO_TOKEN);
            }

            await authService.verifyToken(refresh_token, 'refresh');

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
