const User = require('../db/models/User');

module.exports = {
    findUsers: (filterObject) => User.find(filterObject),

    findUserById: (id) => User.findById(id),

    createUser: (userObject) => User.create(userObject),

    deleteUser: (id) => User.deleteOne(id)
};
