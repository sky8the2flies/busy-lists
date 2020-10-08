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
        title: String,
        tasks: [taskSchema],
        position: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Column', columnSchema);
