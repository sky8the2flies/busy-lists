export default {
    getAll,
    getRandom,
};

const BASE_URL = '/api/images';

function getAll() {
    return fetch(BASE_URL).then((res) => res.json());
}

function getRandom() {
    return fetch(`${BASE_URL}/random`).then((res) => res.json());
}
