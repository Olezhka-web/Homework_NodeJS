const ErrorHandler = require('../errors/ErrorHandler');
const carService = require('../service/car.service');
const messages = require('../messages/car.messages');
const errorCodes = require('../constants/errorCodes.enum');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { model, price } = req.query;
            if (!model && !price) {
                const cars = await carService.findCars();

                if (cars.length === 0) {
                    throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_CAR);
                }
                req.cars = cars;

                return next();
            }

            if (model) {
                const carsModel = await carService.findCars({ model });

                if (carsModel.length === 0) {
                    throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_CAR);
                }
                req.cars = carsModel;

                return next();
            }
            const carsPrice = await carService.findCars({ price });
            if (carsPrice.length === 0) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_CAR);
            }

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
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_MODEL);
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
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_PRICE);
            }

            if (typeof price !== 'number') {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.INVALID_PRICE);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkDeleteCar: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id || id === '') {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.INVALID_ID);
            }
            const car = await carService.findCarById(id);
            if (!car) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.NO_CAR);
            }
            await carService.deleteCar({ _id: id });
            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    }
};
