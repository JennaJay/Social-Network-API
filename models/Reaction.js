const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
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
    },
    
);

const Reaction = model('Reaction', reactionSchema);

module.exports = reactionSchema