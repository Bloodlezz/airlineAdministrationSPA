const binder = require('../helpers/binder');
const validator = require('../helpers/validator');
const notificator = require('../helpers/notificator');
const hbsHelpers = require('../helpers/hbsHelpers');

const flightModel = require('../models/flightModel');

module.exports = (() => {

    function getAdd(context) {
        binder.bindPartials(context)
            .then(function () {
                this.partial('views/flight/add.hbs');
            });
    }

    function postAdd(context) {
        let flightData = binder.bindFormToObj(context.params);
        validator.validateFormData(flightData, 'create');

        if (validator.isFormValid()) {
            notificator.showLoading();
            flightData.seats = +flightData.seats;
            flightData.cost = +flightData.cost;
            flightData.public = flightData.public ? 1 : 0;

            flightModel.createFlight(flightData)
                .then(() => {
                    notificator.hideLoading();
                    this.redirect('#/home');
                    notificator.showInfo('Flight created successfully.');
                })
                .catch(function (error) {
                    notificator.hideLoading();
                    notificator.handleError(error);
                });
        } else {
            notificator.showError('Please fill all fields correctly!');
        }
    }

    function getDetails(context) {
        notificator.showLoading();
        let currentId = context.params.id;
        flightModel.getFlightDetails(currentId)
            .then((flightData) => {
                context.flightData = flightData;
                hbsHelpers.formatDate();
                hbsHelpers.isAuthor();
                binder.bindPartials(context)
                    .then(function () {
                        notificator.hideLoading();
                        this.partial('views/flight/details.hbs');
                    })
            })
            .catch(function (error) {
                notificator.hideLoading();
                notificator.handleError(error);
            });
    }

    function getEdit(context) {
        notificator.showLoading();
        let currentId = context.params.id;
        flightModel.getFlightDetails(currentId)
            .then((flightData) => {
                context.flightData = flightData;
                hbsHelpers.isChecked();
                binder.bindPartials(context)
                    .then(function () {
                        notificator.hideLoading();
                        this.partial('views/flight/edit.hbs');
                    })
            })
            .catch(function (error) {
                notificator.hideLoading();
                notificator.handleError(error);
            });
    }

    function postEdit(context) {
        let flightData = binder.bindFormToObj(context.params);
        validator.validateFormData(flightData, 'edit');

        if (validator.isFormValid()) {
            notificator.showLoading();
            flightData._id = flightData.id;
            delete flightData.id;
            flightData.seats = +flightData.seats;
            flightData.cost = +flightData.cost;
            flightData.public = flightData.public ? 1 : 0;

            flightModel.editFlight(flightData)
                .then(() => {
                    notificator.hideLoading();
                    this.redirect(`#/flight/details/${flightData._id}`);
                    notificator.showInfo('Flight edit successful.');
                })
                .catch(function (error) {
                    notificator.hideLoading();
                    notificator.handleError(error);
                });
        } else {
            notificator.showError('Please fill all fields correctly!');
        }
    }

    function deleteFlight(context) {
        notificator.showLoading();
        let currentId = context.params.id;
        flightModel.deleteFlight(currentId)
            .then(() => {
                notificator.hideLoading();
                this.redirect('#/user/myFlights');
                notificator.showInfo('Flight deleted.');
            })
            .catch(function (error) {
                notificator.hideLoading();
                notificator.handleError(error);
            });
    }

    return {
        getAdd,
        postAdd,
        getDetails,
        getEdit,
        postEdit,
        deleteFlight
    }
})();