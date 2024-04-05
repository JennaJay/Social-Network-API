const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reactions');

const thoughtsSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        thoughtText: {
            type: String,
            required: true,
            minLenght: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Thoughts = model('Thoughts', thoughtsSchema)

module.exports = Thoughts;
