const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            }
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User