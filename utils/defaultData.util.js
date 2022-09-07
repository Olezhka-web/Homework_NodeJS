const { models } = require('../db');
const { passwordService } = require('../service');
const { variables } = require('../config');

module.exports = (async () => {
    const user = await models.User.findOne();

    if (!user) {
        const defaultAdmin = {
            name: variables.MAIN_ADMIN_NAME,
            email: variables.MAIN_ADMIN_EMAIL,
            role: 'main_admin',
            password: await passwordService.hash(variables.MAIN_ADMIN_PASSWORD)
        };

        await models.User.create(defaultAdmin);
    }
})();
