const { carService } = require('../service');

const { errorCodes } = require('../constants');

module.exports = {
    getCars: async (req, res, next) => {
        try {
            const cars = await carService.findCars(req.query);

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCar: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createdCar = await carService.createCar(req.body);

            res.status(errorCodes.CREATED).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { _id } = req.car;

            await carService.deleteCar({ _id });

            res.sendStatus(errorCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { id } = req.car;

            await carService.updateCar(id, req.body);

            res.status(errorCodes.CREATED).json(`Car with id ${id} is Update`);
        } catch (e) {
            next(e);
        }
    }

};
