//import tokenService from './tokenService';

export default {
    getAll,
    getOne,
    updateBoard,
    createColumn,
    createTask,
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

function updateBoard(board) {
    fetch(`${BASE_URL}/${board._id}`, {
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(board),
    });
}

function createColumn(boardId, column) {
    return fetch(`${BASE_URL}/${boardId}/columns`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(column),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('I am unsure (column)..');
        })
        .then((board) => board);
}

function createTask(boardId, columnId, task) {
    return fetch(`${BASE_URL}/${boardId}/columns/${columnId}`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(task),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('I am unsure (task)...');
        })
        .then((board) => board);
}
