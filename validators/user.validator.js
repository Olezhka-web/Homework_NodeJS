const Joi = require('joi');
const { EMAIL_REGEXP, PASSWORD_REGEXP, ID_REGEXP } = require('../constants/RegExp/user.RegExp');

const paramsUserValidator = Joi.object({
    id: Joi.string().regex(ID_REGEXP).trim()
});

const queryParamsUserValidator = Joi.object({
    name: Joi.string().min(2).max(10).trim(),
    email: Joi.string().regex(EMAIL_REGEXP).trim()
});

const createUserValidator = Joi.object({
    name:
        Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .trim()
            .required(),
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
});

const updateUserValidator = Joi.object({
    name:
        Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .trim(),
    email: Joi.string().regex(EMAIL_REGEXP).trim()
});

const logUserValidator = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    password: Joi.string().trim().required()
});

module.exports = {
    paramsUserValidator,
    queryParamsUserValidator,
    createUserValidator,
    updateUserValidator,
    logUserValidator
};
