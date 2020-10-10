const express = require('express');
const router = express.Router();
const columnCtrl = require('../../controllers/api/columns');

// GET /api/columns
router.get('/', columnCtrl.getAll);
// PUT /api/columns/:id
router.put('/:id', columnCtrl.update);

module.exports = router;
