const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');

require('dotenv').config();

const { variables } = require('./config');

const app = express();

mongoose.connect(variables.DB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

const {
    authRouter, userRouter, carRouter, adminRouter
} = require('./routes');
const { messages, errorCodes } = require('./constants');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('/admin', adminRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(variables.PORT, () => {
    console.log(`App is ready on port ${variables.PORT}`);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || errorCodes.NOT_FOUND_ERR,
        message: err.message || messages.userMessages.NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || errorCodes.SERVER_ERROR)
        .json({
            message: err.message
        });
}
