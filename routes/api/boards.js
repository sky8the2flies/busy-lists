const express = require('express');
const router = express.Router();

const boardCtrl = require('../../controllers/api/boards');

// GET /api/boards
router.get('/', boardCtrl.getAll);
// POST /api/boards
router.post('/', boardCtrl.createBoard);
// GET /api/boards/:id
router.get('/:id', boardCtrl.getOne);
//PUT /api/boards/:id
router.put('/:id', boardCtrl.updateBoard);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;
