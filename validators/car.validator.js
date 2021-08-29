const Joi = require('joi');

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
    queryParamsCarValidator,
    createCarValidator,
    updateCarValidator
};
