const { models } = require('../db');

module.exports = {
    createCar: (carObject) => models.Car.create(carObject),

    deleteCar: (id) => models.Car.deleteOne(id),

    updateCar: (id, carObject) => models.Car.findByIdAndUpdate(id, carObject),

    getAllCars: async (query = {}) => {
        const {
            perPage = 10,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const orderBy = order === 'asc' ? 1 : -1;

        const filterObject = {};
        const priceFilter = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'model': {
                    filterObject.model = { $regex: `^${filters.model}`, $options: 'gi' };
                    break;
                }
                case 'price': {
                    filterObject.price = filters.price;
                    break;
                }
                case 'price.lte': {
                    Object.assign(priceFilter, { $lte: +filters['price.lte'] });
                    break;
                }
                case 'price.gte': {
                    Object.assign(priceFilter, { $gte: +filters['price.gte'] });
                    break;
                }
                default: {
                    filterObject[filterParam] = filters[filterParam];
                }
            }
        });

        if (Object.keys(priceFilter).length) {
            filterObject.price = priceFilter;
        }

        const cars = await models.Car
            .find(filterObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);

        return cars;
    }
};
