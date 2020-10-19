const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        content: String,
        description: String,
        assigned: [{ type: String }],
        due: { type: Date },
    },
    {
        timestamps: true,
    }
);

const columnSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        tasks: [taskSchema],
    },
    {
        timestamps: true,
    }
);

const boardSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        columns: [columnSchema],
        authors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Board', boardSchema);
