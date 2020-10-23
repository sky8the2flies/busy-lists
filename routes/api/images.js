const express = require('express');
const router = express.Router();

const imageCtrl = require('../../controllers/api/images');

//POST /api/invites/
router.get('/', imageCtrl.getAll);
router.get('/random', imageCtrl.getRandom);

module.exports = router;
