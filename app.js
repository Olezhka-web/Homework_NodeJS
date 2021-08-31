const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT, DB_URI } = require('./config/variables');

const app = express();

mongoose.connect(DB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter, carRouter } = require('./routes');

const messages = require('./constants/messages');
const errorCodes = require('./constants/codes/errorCodes.enum');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log(`App is ready on port ${PORT}`);
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
