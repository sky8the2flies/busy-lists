const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        board: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Invite', inviteSchema);
