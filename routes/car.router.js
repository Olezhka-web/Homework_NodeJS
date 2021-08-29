const router = require('express').Router();

const { carController } = require('../controllers');

const { carMiddleware, globalMiddleware } = require('../middlewares');

router.get('/',
    carMiddleware.validateCarQueryParams,
    carMiddleware.isCarsPresent,
    carController.getCars);
router.post('/',
    carMiddleware.validateCreateCarBody,
    carController.createCar);

router.get('/:id',
    globalMiddleware.validateParams,
    carMiddleware.isCarPresent,
    carController.getCar);
router.delete('/:id',
    globalMiddleware.validateParams,
    carMiddleware.checkDeleteCar,
    carController.deleteCar);
router.put('/:id',
    globalMiddleware.validateParams,
    carMiddleware.validateUpdateCarBody,
    carMiddleware.isCarPresent,
    carController.updateCar);

module.exports = router;
