const request = require('request');

module.exports = {
    getAll,
    getRandom,
};

const BASE_URL = `https://api.unsplash.com/photos/?client_id=${process.env.UNSPLASH_KEY}&orientation=landscape&per_page=30&page=1`;

async function getAll(req, res) {
    return request(BASE_URL, function (err, response, body) {
        console.log(err);
        console.log(body);
        return res.json(body);
    });
}

const BASE_URL_RANDOM = `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_KEY}&orientation=landscape`;

function getRandom(req, res) {
    return request(BASE_URL_RANDOM, function (err, response, body) {
        console.log(err);
        console.log(body);
        return res.json(body);
    });
}
