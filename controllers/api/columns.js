const Board = require('../../models/board');

module.exports = {
    createColumn,
    deleteColumn,
};

async function createColumn(req, res) {
    try {
        const board = await Board.findById(req.params.id);
        board.columns.push(req.body);
        await board.save();
        res.status(201).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}

async function deleteColumn(req, res) {
    try {
        let board = await Board.findById(req.params.id);
        const index = board.columns.findIndex(
            (column) => String(column._id) === req.params.cid
        );
        board.columns.splice(index, 1);
        board = await board.save();
        return res.status(200).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}
