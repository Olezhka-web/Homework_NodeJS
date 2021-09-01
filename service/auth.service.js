const { models } = require('../db');

module.exports = {
    findUser: (filterObject) => models.User.findOne(filterObject),
};
