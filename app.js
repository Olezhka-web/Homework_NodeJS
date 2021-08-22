const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, authRouter } = require('./routes');

app.use('/', authRouter);
app.use('/users', userRouter);

app.listen(5000, () => {
    console.log('App is ready on port 5000');
});
