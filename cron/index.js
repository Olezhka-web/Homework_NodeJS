const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');
const sendMails = require('./sendMails');

module.exports = () => {
    cron.schedule('0 0 1 * *', async () => {
        console.log(`Cron started at ${new Date().toISOString()}`);
        await removeOldTokens();
        console.log(`Cron finished at ${new Date().toISOString()}`);
    });

    cron.schedule('30 6 * * 1,3,5', async () => {
        console.log(`Cron started at ${new Date().toISOString()}`);
        await sendMails();
        console.log(`Cron finished at ${new Date().toISOString()}`);
    });
};
