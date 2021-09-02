module.exports = {
    PORT: process.env.PORT || 5000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/UsersDB',
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Access_Key',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'Refresh_Key'
};
