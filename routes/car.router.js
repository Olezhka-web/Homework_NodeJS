const router = require('express').Router();

const { carController } = require('../controllers');
const {
    isCarPresent, checkCarModel, checkCarPrice, checkDeleteCar
} = require('../middlewares/car.middleware');

router.get('/', isCarPresent, carController.getCars);
router.post('/', checkCarModel, checkCarPrice, carController.createCar);
router.delete('/:id', checkDeleteCar, carController.deleteCar);

module.exports = router;
