const Joi = require('joi');
const { RegExp } = require('../constants');

const queryParamsUserValidator = Joi.object({
    name: Joi.string().min(2).max(10).trim(),
    email: Joi.string().regex(RegExp.EMAIL_REGEXP).trim()
});

const createUserValidator = Joi.object({
    name:
        Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .trim()
            .required(),
    email: Joi.string().regex(RegExp.EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(RegExp.PASSWORD_REGEXP).trim().required(),
});

const updateUserValidator = Joi.object({
    name:
        Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .trim(),
    email: Joi.string().regex(RegExp.EMAIL_REGEXP).trim()
});

const logUserValidator = Joi.object({
    email: Joi.string().regex(RegExp.EMAIL_REGEXP).trim().required(),
    password: Joi.string().trim().required()
});

module.exports = {
    queryParamsUserValidator,
    createUserValidator,
    updateUserValidator,
    logUserValidator
};
