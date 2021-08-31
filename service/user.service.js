const { User } = require('../db/models');

module.exports = {
    findUsers: (filterObject) => User.find(filterObject),

    createUser: (userObject) => User.create(userObject),

    deleteUser: (id) => User.deleteOne(id),

    updateUser: (id, userObject) => User.findByIdAndUpdate(id, userObject)
};
