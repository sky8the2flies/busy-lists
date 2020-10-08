export default {
    getAll,
    update,
};

const BASE_URL = '/api/columns';

async function getAll() {
    const res = await fetch(BASE_URL);
    return await res.json();
}

function update(column) {
    fetch(`${BASE_URL}/${column._id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(column),
    });
}
