const binder = require('../helpers/binder');
const validator = require('../helpers/validator');
const notificator = require('../helpers/notificator');
const hbsHelpers = require('../helpers/hbsHelpers');
const storage = require('../helpers/storage');

const userModel = require('../models/userModel');
const flightModel = require('../models/flightModel');

module.exports = (() => {

    function getRegister(context) {
        binder.bindPartials(context)
            .then(function () {
                this.partial('./views/user/register.hbs');
            });
    }

    function postRegister(context) {
        let userData = binder.bindFormToObj(context.params);
        validator.validateFormData(userData, 'register');

        if (validator.isFormValid()) {
            if (userData.password === userData.checkPass) {
                notificator.showLoading();
                delete userData.checkPass;
                userModel.registerUser(userData)
                    .then((userInfo) => {
                        storage.saveSession(userInfo);
                        notificator.hideLoading();
                        this.redirect('#/home');
                        notificator.showInfo('User registration successful.');
                    })
                    .catch(function (error) {
                        notificator.hideLoading();
                        notificator.handleError(error);
                    });
            } else {
                notificator.showError('Passwords does not match!');
            }
        }
    }

    function getLogin(context) {
        binder.bindPartials(context)
            .then(function () {
                storage.deleteData('validator');
                this.partial('./views/user/login.hbs');
            })
    }

    function postLogin(context) {
        let credentials = binder.bindFormToObj(context.params);
        validator.validateFormData(credentials, 'login');

        if (validator.isFormValid()) {
            notificator.showLoading();
            userModel.loginUser(credentials)
                .then((userInfo) => {
                    storage.saveSession(userInfo);
                    notificator.hideLoading();
                    this.redirect('#/home');
                    notificator.showInfo('Login successful.');
                })
                .catch(function (error) {
                    notificator.hideLoading();
                    notificator.handleError(error);
                });
        }
    }

    function getMyFlights(context) {
        notificator.showLoading();
        flightModel.getUserFlights(storage.getData('userId'))
            .then((flights) => {
                if (flights.length === 0) {
                    context.noFlights = true;
                }
                context.flights = flights;
                hbsHelpers.isActive();
                hbsHelpers.formatDate();
                binder.bindPartials(context)
                    .then(function () {
                        notificator.hideLoading();
                        this.partial('views/user/myFlights.hbs');
                    })
            })
            .catch(function (error) {
                notificator.hideLoading();
                notificator.handleError(error);
            });
    }

    function logout() {
        notificator.showLoading();
        userModel.logoutUser()
            .then(() => {
                storage.clearSession();
                notificator.hideLoading();
                this.redirect('#/');
                notificator.showInfo('Logout successful.');
            })
            .catch(function (error) {
                notificator.hideLoading();
                notificator.handleError(error);
            });
    }

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        getMyFlights,
        logout
    }
})();