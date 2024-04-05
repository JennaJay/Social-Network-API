const { Schema, model, Types } = require('mongoose');

const UsersSchema = new Schema(
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
    }
);

const Users = model('Users', UsersSchema);

module.exports = Users