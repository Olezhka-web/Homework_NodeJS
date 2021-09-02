const { passwordService } = require('../service');

module.exports = {
    getLogUser: async (req, res, next) => {
        try {
            const { body, user } = req;

            await passwordService.compare(user.password, body.password);

            res.json(true);
        } catch (e) {
            next(e);
        }
    }
};
