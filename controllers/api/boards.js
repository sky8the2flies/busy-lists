const Board = require('../../models/board');

module.exports = {
    getAll,
    getOne,
    createBoard,
    updateBoard,
};

async function getAll(req, res) {
    try {
        const boards = await Board.find({});
        return res.status(200).json(boards);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}

async function getOne(req, res) {
    try {
        const board = await Board.findById(req.params.id);
        res.status(200).json(board);
    } catch {
        console.log(err);
        return res.status(400).json(err);
    }
}

async function createBoard(req, res) {
    const board = new Board(req.body);
    try {
        await board.save();
        return res.status(201).json(board);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

async function updateBoard(req, res) {
    try {
        const board = await Board.findByIdAndUpdate(req.params.id, req.body);
        res.status(204).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}
