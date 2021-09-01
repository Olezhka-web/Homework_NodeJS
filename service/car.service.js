const { models } = require('../db');

module.exports = {
    findCars: (filterObject) => models.Car.find(filterObject),

    createCar: (carObject) => models.Car.create(carObject),

    deleteCar: (id) => models.Car.deleteOne(id),

    updateCar: (id, carObject) => models.Car.findByIdAndUpdate(id, carObject)
};
