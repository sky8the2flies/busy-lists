import tokenService from './tokenService';

export default {
    getAll,
    getOne,
    createColumn,
    updateColumns,
};

/* IMPORTANT: ANY REQUEST MADE TO CHANGE DATA IN DB, ADD THIS TO HEADERS */
/**
 * headers: {
 *  'Content-type': 'application/json',
 *  'Authorization': 'Bearer ' + tokenService.getToken()
 * }
 */

const BASE_URL = '/api/boards';

function getAll() {
    return fetch(BASE_URL).then((res) => res.json());
}

function getOne(id) {
    return fetch(`${BASE_URL}/${id}`).then((res) => res.json());
}

function createColumn(boardId, column) {
    return fetch(`${BASE_URL}/${boardId}/columns`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(column),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('I am unsure..');
        })
        .then((board) => board);
}

function updateColumns(board) {
    fetch(`${BASE_URL}/${board._id}`, {
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(board),
    });
}
