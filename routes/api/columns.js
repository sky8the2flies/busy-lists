const express = require('express');
const router = express.Router();

const columnCtrl = require('../../controllers/api/columns');

//POST /api/boards/:id/columns
router.post('/:id/columns', columnCtrl.createColumn);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;
