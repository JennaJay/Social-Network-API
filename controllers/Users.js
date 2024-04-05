const Users = require('../models/Users');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await Users.find();
            res.json(users);
        }   catch (error) {
            res.status(500).json({ message: error.message});
        }
    },

//     async getSingleUser(req, res) {
//         try {
//             const user = await Users.findbyId(req.params.id);
//         }
}    