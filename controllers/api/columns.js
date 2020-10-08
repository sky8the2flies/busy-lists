const Column = require('../../models/column');

module.exports = {
    getAll,
};

async function getAll(req, res) {
    const columns = await Column.find({});
    res.json(columns);
}
