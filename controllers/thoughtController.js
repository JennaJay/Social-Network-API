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

    async getThoughtsById(req, res) {
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
            const thought = await Thought.create(req.body);
            res.status(200).json(thought);
        }   catch (error) {
            res.status(500).json({ message: error.message});
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

