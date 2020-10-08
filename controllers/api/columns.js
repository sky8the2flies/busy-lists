const Column = require('../../models/column');

module.exports = {
    getAll,
    update,
};

async function getAll(req, res) {
    try {
        const columns = await Column.find({}).sort('position');
        res.status(200).json(columns);
    } catch (err) {
        res.status(404).json(err);
    }
}

async function update(req, res) {
    try {
        const column = await Column.findByIdAndUpdate(req.params.id, req.body);
        res.status(204).json(column);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
}
