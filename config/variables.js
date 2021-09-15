module.exports = {
    PORT: process.env.PORT || 5000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/UsersDB',

    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Access_Key',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'Refresh_Key',
    FORGOT_PASSWORD_SECRET_KEY: process.env.FORGOT_PASSWORD_SECRET_KEY || 'Forgot_Password_Key',
    CHANGE_ADMIN_PASSWORD_SECRET_KEY: process.env.CHANGE_ADMIN_PASSWORD_SECRET_KEY || 'Change_Admin_Password_Key',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'test@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'test',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    AWS_S3_NAME: process.env.AWS_S3_NAME || 'AWS Name',
    AWS_S3_REGION: process.env.AWS_S3_REGION || 'AWS Region',
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || 'AWS Access Key',
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || 'AWS Secret Key',

    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3000',

    MAIN_ADMIN_NAME: process.env.MAIN_ADMIN_NAME || 'Main_Admin_Name',
    MAIN_ADMIN_EMAIL: process.env.MAIN_ADMIN_EMAIL || 'testmainadmin@example.com',
    MAIN_ADMIN_PASSWORD: process.env.MAIN_ADMIN_PASSWORD || '123456789'
};
