const Joi = require('joi');

const { RegExp, roles } = require('../constants');

const createAdminValidator = Joi.object({
    name:
        Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .trim()
            .required(),
    email: Joi.string().regex(RegExp.EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(RegExp.PASSWORD_REGEXP).trim().required(),
    role: roles.ADMIN
});

module.exports = {
    createAdminValidator,
};
