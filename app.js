const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const expressRateLimit = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const { variables } = require('./config');

const app = express();

mongoose.connect(variables.DB_URI);

app.use(cors({ origin: _configureCors }));

app.use(helmet());

app.use(expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

const {
    authRouter, userRouter, carRouter, adminRouter
} = require('./routes');
const { messages, errorCodes } = require('./constants');
const { ErrorHandler } = require('./errors');
const cronJobs = require('./cron');
const swaggerJson = require('./docs/swagger.json');

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('/admin', adminRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(variables.PORT, () => {
    console.log(`App is ready on port ${variables.PORT}`);
    cronJobs();
    require('./utils/defaultData.util');
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

function _configureCors(origin, callback) {
    const whiteList = variables.ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(errorCodes.FORBIDDEN, messages.globalMessages.CORS_NOT_ALLOWED), false);
    }

    return callback(null, true);
}
