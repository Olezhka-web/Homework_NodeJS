const ErrorHandler = require('../errors/ErrorHandler');

const { carService } = require('../service');

const messages = require('../constants/messages');
const errorCodes = require('../constants/codes/errorCodes.enum');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { model, price } = req.query;

            if (!model && !price) {
                const cars = await carService.findCars();

                req.cars = cars;

                return next();
            }

            if (model) {
                const carsModel = await carService.findCars({ model });

                req.cars = carsModel;

                return next();
            }

            const carsPrice = await carService.findCars({ price });

            req.cars = carsPrice;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkCarModel: (req, res, next) => {
        try {
            const { model } = req.body;

            if (!model || model === '') {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.carMessages.NO_MODEL);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCarPrice: (req, res, next) => {
        try {
            const { price } = req.body;

            if (!price || price === '') {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.carMessages.NO_PRICE);
            }

            if (typeof price !== 'number') {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.carMessages.INVALID_PRICE);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkDeleteCar: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.carMessages.INVALID_ID);
            }

            const car = await carService.findCarById(id);

            if (!car) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.carMessages.NO_CAR);
            }

            await carService.deleteCar({ _id: id });

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkCarById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.carMessages.INVALID_ID);
            }

            const car = await carService.findCarById(id);

            if (!car) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.carMessages.NO_CAR);
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    }
};
