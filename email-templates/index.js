const { emailActions } = require('../constants');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'WELCOME!!!'
    },
    [emailActions.UPDATE]: {
        templateName: 'update',
        subject: 'Account Updated!!!'
    },
    [emailActions.DELETED_BY_USER]: {
        templateName: 'deleted_by_user',
        subject: 'Deleted Account!!!'
    },
    [emailActions.DELETED_BY_ADMIN]: {
        templateName: 'deleted_by_admin',
        subject: 'Deleted Account!!!'
    },
    [emailActions.AUTH]: {
        templateName: 'auth',
        subject: 'Logged In!!!'
    },
    [emailActions.FORGOT_PASSWORD]: {
        templateName: 'forgot_password',
        subject: 'Forgot Password!!!'
    },
    [emailActions.WELCOME_ADMIN]: {
        templateName: 'welcome_admin',
        subject: 'Welcome Admin!!!'
    },
};
