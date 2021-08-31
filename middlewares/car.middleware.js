const ErrorHandler = require('../errors/ErrorHandler');

const { carService } = require('../service');

const messages = require('../constants/messages');
const errorCodes = require('../constants/codes/errorCodes.enum');

const { carValidator } = require('../validators');

const { Car } = require('../db/models');

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

    isCarsPresent: async (req, res, next) => {
        try {
            const { model, price } = req.query;

            if (!model && !price) {
                const cars = await carService.findCars();

                req.cars = cars;
                return next();
            }

            if (model) {
                const carsByModel = await carService.findCars({ model });

                req.cars = carsByModel;
                return next();
            }

            const carsByPrice = await carService.findCars({ price });

            req.cars = carsByPrice;
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

    getCarByDynamicParam: (paramName, searchIn = 'body', dbFilled = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const car = await Car.findOne({ [dbFilled]: value });

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
