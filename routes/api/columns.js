const express = require('express');
const router = express.Router();
const columnCtrl = require('../../controllers/api/columns');

// GET /api/columns
router.get('/', columnCtrl.getAll);

module.exports = router;
