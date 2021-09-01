const router = require('express').Router();

const { carController } = require('../controllers');

const { carMiddleware, globalMiddleware } = require('../middlewares');

const { dynamicParams } = require('../constants');

router.get('/',
    carMiddleware.validateCarQueryParams,
    carController.getCars);
router.post('/',
    carMiddleware.validateCreateCarBody,
    carController.createCar);

router.get('/:id',
    globalMiddleware.validateParams,
    carMiddleware.getCarByDynamicParam(dynamicParams.ID, dynamicParams.PARAMS, dynamicParams.DB_FIELD),
    carController.getCar);
router.delete('/:id',
    globalMiddleware.validateParams,
    carMiddleware.getCarByDynamicParam(dynamicParams.ID, dynamicParams.PARAMS, dynamicParams.DB_FIELD),
    carController.deleteCar);
router.put('/:id',
    globalMiddleware.validateParams,
    carMiddleware.validateUpdateCarBody,
    carMiddleware.getCarByDynamicParam(dynamicParams.ID, dynamicParams.PARAMS, dynamicParams.DB_FIELD),
    carController.updateCar);

module.exports = router;
