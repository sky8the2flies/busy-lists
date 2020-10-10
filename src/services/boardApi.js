export default {
    getAll,
    update,
};

const BASE_URL = '/api/boards';

async function getAll() {
    const res = await fetch(BASE_URL);
    return await res.json();
}

function update(board) {
    fetch(`${BASE_URL}/${board._id}`, {
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(board),
    });
}
