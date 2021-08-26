const Car = require('../db/models/Car');

module.exports = {
    findCars: (filterObject) => Car.find(filterObject),

    findCarById: (id) => Car.findById(id),

    createCar: (carObject) => Car.create(carObject),

    deleteCar: (id) => Car.deleteOne(id)
};
