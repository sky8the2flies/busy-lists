const request = require('request');

module.exports = {
    getAll,
    getRandom,
};

const BASE_URL = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_KEY}&query=cyberpunk&orientation=landscape&per_page=25`;

async function getAll(req, res) {
    return request(BASE_URL, function (err, response, body) {
        if (!err) return res.status(200).json(JSON.parse(body));
        return res.status(400).json(JSON.parse(body));
    });
}

const BASE_URL_RANDOM = `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_KEY}&orientation=landscape`;

function getRandom(req, res) {
    return request(BASE_URL_RANDOM, function (err, response, body) {
        console.log(err);
        return res.json(body);
    });
}
