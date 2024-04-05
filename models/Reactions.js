const { Schema, Types } = require('mongoose');

const reactionsSchema = new Schema(
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
    },
    
);

const Reactions = model('Reactions', reactionsSchema);

module.exports = Reactions;