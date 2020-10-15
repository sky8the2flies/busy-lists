const Invite = require('../../models/invite');
const Board = require('../../models/board');

module.exports = {
    getOne,
    getAll,
    createInvite,
};

async function getOne(req, res) {
    try {
        const invite = await Invite.findById(req.params.id).populate('board');
        if (!invite) return res.status(404).json(null);
        const board = await Board.findById(invite.board._id);
        if (board.authors.includes(req.user._id)) {
            return res.status(200).json(board);
        }
        board.authors.push(req.user._id);
        await board.save();
        if (invite.uses) {
            if (invite.uses === 1) invite.remove();
            else {
                invite.uses -= 1;
                await invite.save();
            }
        }
        return res.status(202).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}

async function getAll(req, res) {
    try {
        const invites = await Invite.find({ board: req.body._id });
        return res.status(200).json(invites);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}

async function createInvite(req, res) {
    const invite = new Invite(req.body);
    try {
        await invite.save();
        return res.status(201).json(invite);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}
