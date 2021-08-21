const { readFile } = require("../services/readFile.service");
const path = require('path');
const { arrUsers } = require("../services/getData.service");
const { writeFile } = require("../services/writeFile.service");

const dbPath = path.join(__dirname, '../db/users.txt');

module.exports = {
    loginPage: (req, res) => {
        res.status(200).json('Введіть логін та пароль');
    },

    loginCheck: (req, res) => {
        readFile(dbPath, (value) => {
            if (value !== '') {
                const users = JSON.parse(value);
                const searchUserDb = users.findIndex(user => user.email === req.body.email && user.password === req.body.password);
                const searchUserEmail = users.find(user => user.email === req.body.email);
                if (searchUserDb !== -1) {
                    res.redirect(`/users/${searchUserDb}`);
                    return;
                } else {

                    if (!searchUserEmail) {
                        res.status(404).json('There is no user with this email. Please register');
                        return;
                    }

                    res.status(404).json('Invalid password');
                    return;
                }

            }

            res.status(404).json('There is no user with this email. Please register');
        });
    },

    registerPage: (req, res) => {
        res.status(200).json('Напишіть логін та пароль щоб зареєструватися');
    },

    registerCheck: (req, res) => {
        readFile(dbPath, (value) =>{
            if (value !== ''){
                const searchUser = arrUsers.find(user => user.email === req.body.email);

                if(searchUser){
                    res.status(404).json('User with this email is already registered. Please' +
                        ' choose another email or if this is your registered email, please log in to your' +
                        ' account.');
                    return;
                }

            }

            arrUsers.push(req.body);
            writeFile(dbPath, JSON.stringify(arrUsers));
            res.redirect('/users');
        });
    }
}
