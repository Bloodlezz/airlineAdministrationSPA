const requester = require('../helpers/requester');

module.exports = (() => {

    function registerUser(userData) {
        return requester.post('user', '', 'basic', userData);
    }

    function loginUser(credentials) {
        return requester.post('user', 'login', 'basic', credentials);
    }

    function logoutUser() {
        return requester.post('user', '_logout', 'kinvey');
    }

    return {
        registerUser,
        loginUser,
        logoutUser
    }
})();