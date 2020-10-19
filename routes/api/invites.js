const express = require('express');
const router = express.Router();

const inviteCtrl = require('../../controllers/api/invites');

//POST /api/invites/
router.post('/', inviteCtrl.getAll);
//POST /api/invites/
router.post('/create', inviteCtrl.createInvite);
//GET /api/invites/:id
router.get('/:id', inviteCtrl.getOne);

module.exports = router;
