const Board = require('../../models/board');

module.exports = {
    createTask,
};

async function createTask(req, res) {
    try {
        const board = await Board.findById(req.params.id);
        const column = board.columns.find((column) => {
            return String(column._id) === String(req.params.cid);
        });
        if (!column) return res.status(404).json();
        column.tasks.push(req.body);
        await board.save();
        res.status(201).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}
