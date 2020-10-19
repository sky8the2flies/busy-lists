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
//DELETE /api/boards/:id
router.delete('/:id', boardCtrl.deleteBoard);

module.exports = router;
