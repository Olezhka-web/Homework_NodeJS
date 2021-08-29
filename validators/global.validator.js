const Joi = require('joi');

const { ID_REGEXP } = require('../constants/RegExp/user.RegExp');

const paramsValidator = Joi.object({
    id: Joi.string().regex(ID_REGEXP).trim()
});

module.exports = {
    paramsValidator
};
