const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { models } = require('../db');
const { emailService } = require('../service');
const { emailActions } = require('../constants');

module.exports = async () => {
    const period = dayjs.utc().subtract(10, 'days');

    const notActiveUsers = await models.OAuth.find({ createdAt: { $lte: period } }).populate('user');

    await Promise.all(notActiveUsers.map(async ({ user }) => {
        await emailService.sendMail(
            user.email,
            emailActions.NOT_ACTIVE,
            { userName: user.name }
        );
    }));
};
