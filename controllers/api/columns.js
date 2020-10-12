const Board = require('../../models/board');

module.exports = {
    createColumn,
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
