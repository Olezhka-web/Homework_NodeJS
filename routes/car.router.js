const router = require('express').Router();

const { carController } = require('../controllers');

const { carMiddleware } = require('../middlewares');

router.get('/', carMiddleware.isCarPresent, carController.getCars);
router.post('/', carMiddleware.checkCarModel, carMiddleware.checkCarPrice, carController.createCar);
router.delete('/:id', carMiddleware.checkDeleteCar, carController.deleteCar);
router.put('/:id',
    carMiddleware.checkCarModel,
    carMiddleware.checkCarPrice,
    carController.updateCar);

module.exports = router;
