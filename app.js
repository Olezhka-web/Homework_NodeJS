const express = require('express');
const path = require('path');

const app = express();
const dbPath = path.join(__dirname, '/db/users.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, authRouter } = require('./routes');
const { readFile, getData } = require('./services');

readFile.readFile(dbPath, getData.getDataFromDb);

app.use('/', authRouter);
app.use('/users', userRouter);

app.listen(5000, () => {
    console.log('App is ready on port 5000');
});
