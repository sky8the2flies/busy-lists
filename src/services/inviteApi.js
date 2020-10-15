import tokenService from './tokenService';

export default {
    getAll,
    getOne,
    createInvite,
};

const BASE_URL = '/api/invites';

function getAll(board) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: tokenService.getAuthMethods(),
        body: JSON.stringify(board),
    }).then((res) => res.json());
}

function getOne(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'GET',
        headers: tokenService.getAuthMethods(),
    }).then((res) => res.json());
}

function createInvite(data) {
    return fetch(`${BASE_URL}/create`, {
        method: 'POST',
        headers: tokenService.getAuthMethods(),
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('I am unsure (create invite)..');
        })
        .then((invite) => invite);
}
