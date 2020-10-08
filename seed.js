require('dotenv').config();
require('./config/database');
const Column = require('./models/column');

Column.find({}, function (err, columns) {
    columns[0].tasks.push({ content: 'Feed Dogs' });
    columns[0].save();
});
