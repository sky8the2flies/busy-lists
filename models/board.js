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
        bgUrl: {
            type: String,
            default:
                'https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
        },
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
