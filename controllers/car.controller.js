const carService = require('../service/car.service');
const errorCodes = require('../constants/errorCodes.enum');

module.exports = {
    getCars: (req, res, next) => {
        try {
            res.status(errorCodes.OK).json(req.cars);
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
            res.status(errorCodes.OK).json(`Car with id ${req.car.id} is deleted`);
        } catch (e) {
            next(e);
        }
    }

};
