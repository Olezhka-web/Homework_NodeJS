const {
    userService, passwordService, emailService, s3Service
} = require('../service');
const { errorCodes, emailActions } = require('../constants');
const { userUtil } = require('../utils');
const { models } = require('../db');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers(req.query);

            const userNormalizedUser = users.map((user) => userUtil.userNormalizator(user));

            res.json(userNormalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getUser: (req, res, next) => {
        try {
            const userNormalizedUser = userUtil.userNormalizator(req.user);

            res.json(userNormalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            let createdUser = await userService.createUser({ ...req.body, password: hashedPassword });

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, 'users', createdUser._id);
                createdUser = await models.User.findByIdAndUpdate(
                    createdUser._id,
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            const userNormalizedUser = userUtil.userNormalizator(createdUser);

            await emailService.sendMail(
                createdUser.email,
                emailActions.WELCOME,
                { userName: createdUser.name }
            );

            res.status(errorCodes.CREATED).json(userNormalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { deleteByUser, user: { _id, email, name } } = req;

            await userService.deleteUser({ _id });

            if (deleteByUser) {
                await emailService.sendMail(
                    email,
                    emailActions.DELETED_BY_USER,
                    { userName: name }
                );
            } else {
                await emailService.sendMail(
                    email,
                    emailActions.DELETED_BY_ADMIN,
                    { userName: name }
                );
            }

            res.sendStatus(errorCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            let { user } = req;

            if (req.files && req.files.avatar) {
                if (user.avatar) {
                    await s3Service.deleteFile(user.avatar);
                }

                const s3Response = await s3Service.uploadFile(req.files.avatar, 'users', user.id);
                user = await models.User.findByIdAndUpdate(
                    user.id,
                    { ...req.body, avatar: s3Response.Location },
                    { new: true }
                );
            } else {
                await userService.updateUser(user.id, req.body);
            }

            await emailService.sendMail(
                user.email,
                emailActions.UPDATE,
                { userName: user.name }
            );

            res.status(errorCodes.CREATED).json(`User with id ${user.id} is Update`);
        } catch (e) {
            next(e);
        }
    }
};
