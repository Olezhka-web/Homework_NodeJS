const { fileSettings, errorCodes, messages } = require('../constants');
const { ErrorHandler } = require('../errors');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if (size > fileSettings.PHOTO_MAX_SIZE) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, `${name} ${messages.userMessages.FILE_IS_TOO_BIG}`);
            }

            if (!fileSettings.MIMETYPES.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, messages.userMessages.WRONG_FILE_FORMAT);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
