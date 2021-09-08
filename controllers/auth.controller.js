const { passwordService, authService, emailService } = require('../service');

const { userUtil } = require('../utils');

const { models } = require('../db');

const { header, messages, emailActions } = require('../constants');

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

    changePassword: (req, res, next) => {
        try {
            next();
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
