const { passwordService, authService, emailService } = require('../service');

const { userUtil } = require('../utils');

const { models } = require('../db');

const {
    header, messages, emailActions, actionTokens, errorCodes
} = require('../constants');

const { variables } = require('../config');

module.exports = {
    getLogUser: async (req, res, next) => {
        try {
            const { body, user } = req;

            await passwordService.compare(user.password, body.password);

            const tokenPair = authService.generateTokenPair();

            await models.OAuth.create({ ...tokenPair, user: user._id });

            await emailService.sendMail(
                user.email,
                emailActions.AUTH,
                { userName: user.name }
            );

            res.json({
                ...tokenPair,
                user: userUtil.userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    },

    getLogoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(header.AUTHORIZATION);

            await models.OAuth.deleteOne({ access_token });

            res.json(messages.userMessages.USER_LOGGED_OUT);
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const { user } = req;

            const action_token = authService.generateActionToken(actionTokens.FORGOT_PASSWORD);

            await models.ActionToken.create({ action_token, user: user._id });

            await emailService.sendMail(
                user.email,
                emailActions.FORGOT_PASSWORD,
                { userName: user.name, forgotPasswordURL: `${variables.FRONTEND_URL}/password?actionToken=${action_token}` }
            );

            res.json(messages.userMessages.OK);
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { loggedUser: { _id }, body: { password } } = req;
            const action_token = req.get(header.AUTHORIZATION);

            const hashPassword = await passwordService.hash(password);

            await models.User.findByIdAndUpdate(_id, { password: hashPassword });

            await models.ActionToken.deleteOne({ action_token });

            await models.OAuth.deleteMany({ user: _id });

            res.status(errorCodes.CREATED).json(messages.userMessages.OK);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.get(header.AUTHORIZATION);
            const user = req.loggedUser;

            await models.OAuth.deleteOne({ refresh_token });

            const tokenPair = authService.generateTokenPair();

            await models.OAuth.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userUtil.userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    }
};
