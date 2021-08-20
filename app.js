const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const app = express();

const usersDirPath = path.join(__dirname, 'users');
const dbPath = path.join(usersDirPath, 'users.txt');

app.use(express.static(usersDirPath));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', usersDirPath);

const arrUsers = [];

const writeFile = (data) =>{
    fs.writeFile(dbPath, data, err => {

        if(err){
            console.log(err);
        }

    });
};

const readFile = (func) =>{
    fs.readFile(dbPath, (err, data) => {

       if(err){
           console.log(err);
       }

       func(data.toString());
    });
};

const getDataFromDb = (data) =>{

    if(data.trim() !== ''){
       JSON.parse(data).map(value => arrUsers.push(value));
    }

};

readFile(getDataFromDb);

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) =>
{
    readFile((value) =>{

        if (value !== ''){
            const searchUser = arrUsers.find(user => user.email === req.body.email);

            if(searchUser){
                return res.render('error', {error: 'Error! User with this email is already registered. Please' +
                        ' choose another email or if this is your registered email, please log in to your' +
                        ' account.'});
            }

        }

        arrUsers.push(req.body);
        writeFile(JSON.stringify(arrUsers));
        res.redirect('/users');
    });
});

app.get('/users', (req, res) => {
    readFile((value) => {

        if(value !== ''){
            const users = JSON.parse(value);
            res.render('users', {users});
            return;
        }

        const users = [];
        res.render('users', {users});
    });
});

app.get('/login', (req, res) => {
   res.render('login');
});

app.post('/login', (req, res) => {
    readFile((value) => {

        if(value !== ''){
            const users = JSON.parse(value);
            const searchUserDb = users.findIndex(user => user.email === req.body.email && user.password === req.body.password);
            const searchUserEmail = users.find(user => user.email === req.body.email);
            if (searchUserDb !== -1) {
                res.redirect(`/user/${searchUserDb}`);
            }

            else {

                if (!searchUserEmail) {
                    res.render('error', {error: 'There is no user with this email. Please register'});
                    return;
                }

                res.render('error', {error: 'Invalid password'});

            }

            res.render('users', {users});
            return;
        }

        res.render('error', {error: 'There is no user with this email. Please register'});
    });
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    res.render('user', {user: arrUsers[id]});
});


app.listen(5000, () =>{
    console.log('App is ready on port 5000');
});
