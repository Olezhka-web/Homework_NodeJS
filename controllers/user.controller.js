const { arrUsers } = require("../services/getData.service");
module.exports = {
    getUsers: (req, res) => {
        res.status(200).json(arrUsers);
    },

    getUserById: (req, res) =>{
        const { id } = req.params;
        const user = arrUsers[id];

        if(!user){
            res.status(404).json('User not found');
            return;
        }

        res.status(200).json(arrUsers[id]);

    }
};
