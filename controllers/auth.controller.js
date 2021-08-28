const errorCodes = require('../constants/codes/errorCodes.enum');

const { passwordService } = require('../service');

module.exports = {
    getLogUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = req.user.password;

            await passwordService.compare(hashPassword, password);

            res.status(errorCodes.OK).json(true);
        } catch (e) {
            next(e);
        }
    }
};
