const router = require('express').Router();

const { carController } = require('../controllers');

const { carMiddleware } = require('../middlewares');

router.get('/',
    carMiddleware.validateCarQueryParams,
    carMiddleware.isCarsPresent,
    carController.getCars);
router.post('/',
    carMiddleware.validateCreateCarBody,
    carController.createCar);

router.get('/:id',
    carMiddleware.validateCarParams,
    carMiddleware.isCarPresent,
    carController.getCar);
router.delete('/:id',
    carMiddleware.validateCarParams,
    carMiddleware.checkDeleteCar,
    carController.deleteCar);
router.put('/:id',
    carMiddleware.validateCarParams,
    carMiddleware.validateUpdateCarBody,
    carMiddleware.isCarPresent,
    carController.updateCar);

module.exports = router;
