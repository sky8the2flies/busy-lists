export default {
    getAll,
};

const BASE_URL = '/api/columns';

function getAll() {
    return fetch(BASE_URL).then((res) => res.json());
}
