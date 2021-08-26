const { Car } = require('../db/models');

module.exports = {
    findCars: (filterObject) => Car.find(filterObject),

    findCarById: (id) => Car.findById(id),

    createCar: (carObject) => Car.create(carObject),

    deleteCar: (id) => Car.deleteOne(id),

    updateCar: (id, carObject) => Car.findByIdAndUpdate(id, carObject)
};
