const Board = require('../../models/board');

module.exports = {
    getAll,
    getOne,
    createBoard,
    deleteBoard,
    updateBoard,
};

async function getAll(req, res) {
    try {
        if (!req.user) return res.status(404).json([]);
        const boards = await Board.find({ authors: req.user._id });
        return res.status(200).json(boards);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}

async function getOne(req, res) {
    try {
        const board = await Board.findById(req.params.id).populate('authors');
        res.status(200).json(board);
    } catch {
        console.log(err);
        return res.status(400).json(err);
    }
}

async function createBoard(req, res) {
    const board = new Board(req.body);
    board.columns = [];
    board.authors = [];
    try {
        board.authors.push(req.user);
        await board.save();
        return res.status(201).json(board);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

async function deleteBoard(req, res) {
    try {
        const board = await Board.findById(req.params.id).populate('authors');
        if (board.authors.length > 1) {
            const index = board.authors.findIndex(
                (author) => String(author._id) === String(req.user._id)
            );
            board.authors.splice(index, 1);
            await board.save();
        } else board.remove();

        return res.status(200).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}

async function updateBoard(req, res) {
    try {
        const board = await Board.findByIdAndUpdate(
            req.params.id,
            req.body
        ).populate('authors');
        res.status(204).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}
