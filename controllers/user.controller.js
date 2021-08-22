const path = require('path');

const { readFile } = require('../services');
const { writeFile } = require('../services');

const dbPath = path.join(__dirname, '../db/users.txt');

module.exports = {
    getUsers: async (req, res) => {
        const dataBuff = await readFile.readFilePromise(dbPath);

        if (dataBuff.toString().trim() !== '') {
            return res.status(200).json(JSON.parse(dataBuff.toString()));
        }

        res.status(200).json([]);
    },

    getUserById: async (req, res) => {
        const dataBuff = await readFile.readFilePromise(dbPath);
        if (dataBuff.toString().trim() === '') {
            return res.status(400).json('There is no users!');
        }

        const { id } = req.params;
        const user = JSON.parse(dataBuff.toString())[id];

        if (!user) {
            res.status(404).json('User not found');
            return;
        }

        res.status(200).json(JSON.parse(dataBuff.toString())[id]);
    },

    createUser: async (req, res) => {
        const dataBuff = await readFile.readFilePromise(dbPath);
        const arrUsers = [];

        if (dataBuff.toString().trim() !== '') {
            JSON.parse(dataBuff.toString()).map((value) => arrUsers.push(value));
        }

        const searchUser = arrUsers.find((user) => user.email === req.body.email);

        if (searchUser) {
            res.status(404).json('User with this email is already registered. Please'
                + ' choose another email or if this is your registered email, please log in to your'
                + ' account.');
            return;
        }

        arrUsers.push(req.body);
        await writeFile.writeFilePromise(dbPath, JSON.stringify(arrUsers));
        res.redirect('/users');
    }
};
