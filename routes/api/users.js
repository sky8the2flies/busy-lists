const express = require('express');
const router = express.Router();

const usersCtrl = require('../../controllers/api/users');

/* -- PUBLIC ROUTES --*/
router.post('/signup', usersCtrl.signup);

module.exports = router;
