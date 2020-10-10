export default {
    setToken,
};

function setToken(token) {
    localStorage.setItem('token', token);
}
