const User = require('../models/User');
const Thought = require('../models/Thought')
const { Schema, model, Types } = require('mongoose');

const userController = {

    getAllUsers(req, res) {
        User.find({})
        .then (userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.id }).populate('thoughts')
        .then(userData => {
            if(!userData) {
                return res.status(404).json({ message: 'User not found with this id!'});
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    updateUserById(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(userData => {
            if(!userData) {
                return res.status(404).json({ message: 'User not found with this id!'});
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteUserById(req, res) {
        User.findByIdAndDelete(req.params.id)
        .then(userData => {
            if(!userData) {
                return res.status(404).json({ message: 'User not found with this id!'});
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.userId,
            { $push: { friends: req.params.friendId}},
            { new: true }
        )
        .then(userData => {
            if(!userData) {
                return res.status(404).json({message: 'User not found with this id!'});
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findByIdAndDelete(
            req.params.userId,
            { $pull: { friends: req.params.friendId}},
            { new: true}
        )
        .then(userData => {
            if(!userData) {
                return res.status(404).json({message: 'User not found with this id!'});
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },
}; 

module.exports = userController;