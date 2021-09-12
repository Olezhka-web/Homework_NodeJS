const {
    passwordService, userService, emailService, authService
} = require('../service');

const { userUtil } = require('../utils');

const {
    emailActions, errorCodes, header, actionTokens
} = require('../constants');

const { variables } = require('../config');

const { models } = require('../db');

module.exports = {
    createAdminUser: async (req, res, next) => {
        try {
            const { loggedUser, body: { password } } = req;
            const token = req.get(header.AUTHORIZATION);

            const hashedPassword = await passwordService.hash(password);

            const createdAdmin = await userService.createUser({ ...req.body, password: hashedPassword });

            const userNormalizedAdmin = userUtil.userNormalizator(createdAdmin);

            const actionToken = authService.generateActionToken(actionTokens.CHANGE_ADMIN_PASSWORD);

            await models.ActionToken.create({ actionToken, user: createdAdmin._id });

            await emailService.sendMail(
                createdAdmin.email,
                emailActions.WELCOME_ADMIN,
                { userName: createdAdmin.name, mainAdmin: loggedUser.name, adminURL: `${variables.FRONTEND_URL}?token=${token}` }
            );

            res.status(errorCodes.CREATED).json(userNormalizedAdmin);
        } catch (e) {
            next(e);
        }
    }
};
