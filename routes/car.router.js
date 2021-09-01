const router = require('express').Router();

const { carController } = require('../controllers');

const { carMiddleware, globalMiddleware } = require('../middlewares');

router.get('/',
    carMiddleware.validateCarQueryParams,
    carController.getCars);
router.post('/',
    carMiddleware.validateCreateCarBody,
    carController.createCar);

router.get('/:id',
    globalMiddleware.validateParams,
    carMiddleware.getCarByDynamicParam('id', 'params', '_id'),
    carController.getCar);
router.delete('/:id',
    globalMiddleware.validateParams,
    carMiddleware.getCarByDynamicParam('id', 'params', '_id'),
    carController.deleteCar);
router.put('/:id',
    globalMiddleware.validateParams,
    carMiddleware.validateUpdateCarBody,
    carMiddleware.getCarByDynamicParam('id', 'params', '_id'),
    carController.updateCar);

module.exports = router;
