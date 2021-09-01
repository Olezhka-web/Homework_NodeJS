const { models } = require('../db');

module.exports = {
    findUsers: (filterObject) => models.User.find(filterObject),

    createUser: (userObject) => models.User.create(userObject),

    deleteUser: (id) => models.User.deleteOne(id),

    updateUser: (id, userObject) => models.User.findByIdAndUpdate(id, userObject)
};
