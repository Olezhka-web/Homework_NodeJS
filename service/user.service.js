const { models } = require('../db');

module.exports = {
    createUser: (userObject) => models.User.create(userObject),

    deleteUser: (id) => models.User.deleteOne(id),

    updateUser: (id, userObject) => models.User.findByIdAndUpdate(id, userObject),

    getAllUsers: async (query = {}) => {
        const {
            perPage = 10,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const orderBy = order === 'asc' ? 1 : -1;

        const filterObject = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'role': {
                    const rolesArr = filters.role.split(';');
                    filterObject.role = { $in: rolesArr };
                    break;
                }
                case 'name': {
                    filterObject.name = { $regex: `^${filters.name}`, $options: 'gi' };
                    break;
                }
                default: {
                    filterObject[filterParam] = filters[filterParam];
                }
            }
        });

        const users = await models.User
            .find(filterObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);

        return users;
    }
};
