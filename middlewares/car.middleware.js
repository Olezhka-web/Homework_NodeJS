const { ErrorHandler } = require('../errors');

const { messages, errorCodes } = require('../constants');

const { carValidator } = require('../validators');

const { models } = require('../db');

module.exports = {
    validateCarQueryParams: (req, res, next) => {
        try {
            const { error } = carValidator.queryParamsCarValidator.validate(req.query);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.carMessages.INVALID_SEARCH_OPTION);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCreateCarBody: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUpdateCarBody: (req, res, next) => {
        try {
            const { error } = carValidator.updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getCarByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const car = await models.Car.findOne({ [dbField]: value });

            if (!car) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.NOT_FOUND);
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    }
};
