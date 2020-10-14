const Invite = require('../../models/invite');
const User = require('../../models/user');
const Board = require('../../models/board');

module.exports = {
    getOne,
    getAll,
    createInvite,
};

async function getOne(req, res) {
    try {
        const invite = await Invite.findById(req.params.id).populate('board');
        const user = await User.find({ email: invite.email });
        const board = await Board.findById(invite.board._id);
        board.authors.push(user._id);
        await board.save();
        return res.status(202).json(board);
    } catch (err) {
        console.log(err);
        return res.status(404).json(err);
    }
}

async function getAll(req, res) {
    try {
        const invites = await Invite.find({ email: req.user.email });
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
