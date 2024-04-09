const { get } = require('mongoose');
const { Thought, User, Reaction } = require('../models');
const { json } = require('express');


const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }   catch (error) {
            res.status(500).json({ message: error.message});
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id });
            if(!thought) {
                res.status(404).json({ message: 'No thought found with this id!'});
            }   else {
                res.json(thought);
            }
        }   catch (error) {
            res.status(500).json({ message: error.message});
        }
    },
    
    async createThought(req, res) {
        try {
        // Extract username from req.body or wherever it's located
        const username = req.body.username; // Adjust this according to your data structure
        
        // Query the user by username
        const user = await User.findOne({ username });
        
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        
        // Create the thought and associate it with the user
        const thought = await Thought.create({ ...req.body, userId: user._id });
        user.thoughts.push(thought._id);
        await user.save();
        res.status(200).json(thought);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
        },
        

    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughId, req.body, { new: true });
            if(!thought) {
                res.status(404).json({ message: 'No thought found with this id!'});
            }   else {
                res.json(thought);
            }
        }   catch (error) {
            res.status(500).json({ message: error.message});
        }
    },

     async deleteThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);
            if(!thought) {
                res.status(404),json({ message: 'No thought found with this id!'});
            }   else {
                res.json(thought);
            }
        }   catch (err) {
            res.status(500).json(err);
        }
     },

     async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body }},
                { new: true }
            );
            if(!thought) {
                res.status(404).json({ message: 'No thought found!'});
            }   else {
                res.json(thought);
            }
        }   catch (error) {
            res.status(500).json(err);
        }
     },

        async deleteReaction(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: { reactionId: req.params.reactionId }}},
                    { new: true }
                );
                if(!thought) {
                    res.status(404).json({ message: 'No thought found!'});
                }   else {
                    res.json(thought);
                }
            }   catch (error) {
                res.status(500).json(err);
            }
        },
}

module.exports = thoughtController;

