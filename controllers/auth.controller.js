const path = require('path');
const { readFile } = require('../services');

const dbPath = path.join(__dirname, '../db/users.txt');

module.exports = {
    loginPage: (req, res) => {
        res.status(200).json('Введіть логін та пароль');
    },

    loginCheck: async (req, res) => {
        const dateBuff = await readFile.readFilePromise(dbPath);

        if (dateBuff.toString().trim() !== '') {
            const users = JSON.parse(dateBuff.toString());
            // eslint-disable-next-line max-len
            const searchUserDb = users.findIndex((user) => user.email === req.body.email && user.password === req.body.password);
            const searchUserEmail = users.find((user) => user.email === req.body.email);

            if (searchUserDb !== -1) {
                res.redirect(`/users/${searchUserDb}`);
                return;
            }

            if (!searchUserEmail) {
                res.status(404).json('There is no user with this email. Please register');
                return;
            }

            res.status(404).json('Invalid password');
            return;
        }

        res.status(404).json('There is no user with this email. Please register');
    }
};
