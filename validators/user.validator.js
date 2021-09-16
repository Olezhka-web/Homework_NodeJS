const Joi = require('joi');

const { RegExp } = require('../constants');

const passwordSchema = Joi.string().regex(RegExp.PASSWORD_REGEXP).trim().required();

const queryParamsUserValidator = Joi.object({
    name: Joi.string().min(2).max(10).trim(),
    email: Joi.string().regex(RegExp.EMAIL_REGEXP).trim(),
    page: Joi.number().min(1),
    perPage: Joi.number().min(1),
    order: Joi.string().min(3).max(4).trim(),
    role: Joi.string().min(4).max(12).trim()
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
    password: passwordSchema,
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
    password: passwordSchema
});

const passwordValidator = Joi.object({ password: passwordSchema });

const emailValidator = Joi.object({ email: Joi.string().regex(RegExp.EMAIL_REGEXP).trim().required() });

const resetPasswordValidator = Joi.object({
    password: passwordSchema,
    oldPassword: passwordSchema
});

module.exports = {
    queryParamsUserValidator,
    createUserValidator,
    updateUserValidator,
    logUserValidator,
    passwordValidator,
    resetPasswordValidator,
    emailValidator
};
