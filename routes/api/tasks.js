const express = require('express');
const router = express.Router();

const taskCtrl = require('../../controllers/api/tasks');

//POST /api/boards/:id/columns/:cid
router.post('/:id/columns/:cid', taskCtrl.createTask);
//PUT /api/boards/:id/columns/:cid/tasks/:tid
router.put('/:id/columns/:cid/tasks/:tid', taskCtrl.updateTask);
//DELETE /api/boards/:id/columns/:cid/tasks/:tid
router.delete('/:id/columns/:cid/tasks/:tid', taskCtrl.deleteTask);

module.exports = router;
