const Joi = require('joi');
const { ID_REGEXP } = require('../constants/RegExp/user.RegExp');

const paramsCarValidator = Joi.object({
    id: Joi.string().regex(ID_REGEXP).trim()
});

const queryParamsCarValidator = Joi.object({
    model: Joi.string().alphanum().min(2).max(30)
        .trim(),
    price: Joi.number()
});

const createCarValidator = Joi.object({
    model:
        Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .trim()
            .required(),
    price: Joi.number().required()
});

const updateCarValidator = Joi.object({
    model:
        Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .trim(),
    price: Joi.number()
});

module.exports = {
    paramsCarValidator,
    queryParamsCarValidator,
    createCarValidator,
    updateCarValidator
};
