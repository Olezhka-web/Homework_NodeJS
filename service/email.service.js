const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { variables } = require('../config');
const allTemplates = require('../email-templates');
const { errorCodes, messages } = require('../constants');
const { ErrorHandler } = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: variables.NO_REPLY_EMAIL,
        pass: variables.NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(errorCodes.SERVER_ERROR, messages.userMessages.WRONG_TEMPLATE_NAME);
    }

    const { templateName, subject } = templateInfo;
    context = { ...context, frontendURL: variables.FRONTEND_URL };

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};
