const Board = require('../../models/board');

module.exports = {
    createTask,
    updateTask,
    deleteTask,
};

async function createTask(req, res) {
    req.body.assigned = [];
    req.body.description = '';
    try {
        const board = await Board.findById(req.params.id).populate('authors');
        const column = board.columns.find((column) => {
            return String(column._id) === String(req.params.cid);
        });
        if (!column)
            return res.status(404).json({
                err: {
                    msg: 'Column returned 404',
                },
            });
        column.tasks.push(req.body);
        await board.save();
        return res.status(201).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}

async function updateTask(req, res) {
    try {
        const board = await Board.findById(req.params.id).populate('authors');
        const column = board.columns.find((column) => {
            return String(column._id) === String(req.params.cid);
        });
        if (!column)
            return res.status(404).json({
                err: {
                    msg: 'Column returned 404',
                },
            });
        const index = column.tasks.findIndex((task) => {
            return String(task._id) === String(req.params.tid);
        });
        if (index === -1)
            return res.status(404).json({
                err: {
                    msg: 'Task returned 404',
                },
            });
        column.tasks.splice(index, 1, req.body);
        await board.save();
        return res.status(200).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}

async function deleteTask(req, res) {
    try {
        const board = await Board.findById(req.params.id).populate('authors');
        const column = board.columns.find((column) => {
            return String(column._id) === String(req.params.cid);
        });
        if (!column)
            return res.status(404).json({
                err: {
                    msg: 'Column returned 404',
                },
            });
        const index = column.tasks.findIndex((task) => {
            return String(task._id) === String(req.params.tid);
        });
        if (index === -1)
            return res.status(404).json({
                err: {
                    msg: 'Task returned 404',
                },
            });
        column.tasks.splice(index, 1);
        await board.save();
        return res.status(200).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}
