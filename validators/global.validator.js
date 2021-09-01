const Joi = require('joi');

const { RegExp } = require('../constants');

const paramsValidator = Joi.object({
    id: Joi.string().regex(RegExp.ID_REGEXP).trim()
});

module.exports = {
    paramsValidator
};
