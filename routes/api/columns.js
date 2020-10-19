const express = require('express');
const router = express.Router();

const columnCtrl = require('../../controllers/api/columns');

//POST /api/boards/:id/columns
router.post('/:id/columns', columnCtrl.createColumn);
//DELETE /api/boards/:id/columns/:cid
router.delete('/:id/columns/:cid', columnCtrl.deleteColumn);

module.exports = router;
