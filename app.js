const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const app = express();

let arrUsers = [];

app.use(express.static(path.join(__dirname, 'users')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'users'));

app.get('/register', (req, res) => {
    res.render('register');
});

fs.readFile(path.join(__dirname, '/users/users.txt'), (err, data) => {
    if (data.toString() !== '') {
        let usersObjects = JSON.parse(data.toString());
        usersObjects.map(value => arrUsers.push(value));
    }
});

app.post('/register', (req, res) => {
    fs.readFile(path.join(__dirname, '/users/users.txt'), (err, data) => {
        if (data.toString() !== ''){
            let searchUser = arrUsers.find(user => user.email === req.body.email);
            if(searchUser){
                res.render('error', {error: 'Error! User with this nickname is already registered. Please choose another nickname or if this is your registered nickname, please log in to your account.'});
            }
            else{
                arrUsers.push(req.body);
                fs.writeFile(path.join(__dirname, '/users/users.txt'), `${JSON.stringify(arrUsers)}`, err => {
                    if (err) {
                        console.log(err);
                    }
                });
                res.redirect('/all_users');
            }
        } else{
            arrUsers.push(req.body);
            fs.writeFile(path.join(__dirname, '/users/users.txt'), `${JSON.stringify(arrUsers)}`, err => {
                if (err) {
                    console.log(err);
                }
            });
            res.redirect('/all_users');
        }
        if (err){
            console.log(err);
        }
    });
});

app.get('/error', (req, res) => {
    res.render('error');
});

app.get('/all_users', (req, res) => {
    fs.readFile(path.join(__dirname, '/users/users.txt'), (err, data) => {
        let users = JSON.parse(data.toString());
        res.render('all_users', {users});
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    fs.readFile(path.join(__dirname, '/users/users.txt'), (err, data) => {
        if (data.toString() !== '') {
            let users = JSON.parse(data.toString());
            // let searchUserDb =  users.find(user => user.email === req.body.email && user.password === req.body.password);
            let searchUserDb = users.findIndex(user => user.email === req.body.email && user.password === req.body.password);
            let searchUserEmail = users.find(user => user.email === req.body.email);
            if (searchUserDb !== -1) {
                res.redirect(`/user/${searchUserDb}`);
            } else {
                if (!searchUserEmail) {
                    res.render('error', {error: 'There is no user with this email. Please register'});
                } else {
                    res.render('error', {error: 'Invalid password'});
                }
            }
        }else{
            res.render('error', {error: 'There is no user with this email. Please register'});
        }
    });
});

app.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    res.render('user', {user: arrUsers[userId]});
});

app.listen(5000, () =>{
    console.log('App is ready on port 5000');
});
