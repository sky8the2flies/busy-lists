import tokenService from './tokenService';

export default {
    getUser,
    signup,
    login,
    logout,
};

const BASE_URL = '/api/users';

function getUser() {
    return tokenService.getUserFromToken();
}

function signup(user) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(user),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Email already taken!');
        })
        .then(({ token }) => {
            tokenService.setToken(token);
        });
}

function login(user) {}

function logout() {
    tokenService.removeToken();
}
