const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { models } = require('../db');

module.exports = async () => {
    const previousMonth = dayjs.utc().subtract(1, 'month');

    await models.OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
    await models.ActionToken.deleteMany({ createdAt: { $lte: previousMonth } });
};
