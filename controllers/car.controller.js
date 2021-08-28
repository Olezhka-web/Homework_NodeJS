const { carService } = require('../service');

const errorCodes = require('../constants/codes/errorCodes.enum');

module.exports = {
    getCars: (req, res, next) => {
        try {
            res.json(req.cars);
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

    deleteCar: (req, res, next) => {
        try {
            res.status(errorCodes.DELETED).json(`Car with id ${req.car.id} is deleted`);
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
