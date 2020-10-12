const express = require('express');
const router = express.Router();

const taskCtrl = require('../../controllers/api/tasks');

//POST /api/boards/:id/columns/:cid
router.post('/:id/columns/:cid', taskCtrl.createTask);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;
