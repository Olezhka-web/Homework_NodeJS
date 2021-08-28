const { User } = require('../db/models');

module.exports = {
    findUser: (filterObject) => User.findOne(filterObject),
};
