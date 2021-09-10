module.exports = {
    globalMiddleware: require('./global.middleware'),
    authMiddleware: require('./auth.middleware'),
    userMiddleware: require('./user.middleware'),
    carMiddleware: require('./car.middleware'),
    adminMiddleware: require('./admin.middleware')
};
