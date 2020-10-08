const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        content: String,
    },
    {
        timestamps: true,
    }
);

const columnSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        position: { type: Number, required: true },
        tasks: [taskSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Column', columnSchema);
