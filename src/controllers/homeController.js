const binder = require('../helpers/binder');
const notificator = require('../helpers/notificator');
const hbsHelpers = require('../helpers/hbsHelpers');

const flightModel = require('../models/flightModel');

module.exports = (() => {

    function index(context) {
        hbsHelpers.isActive();
        binder.bindPartials(context)
            .then(function () {
                this.partial('./views/common/nav.hbs');
            });
    }

    function home(context) {
        notificator.showLoading();
        flightModel.getAllFlights()
            .then((flights) => {
                context.flights = flights;
                hbsHelpers.isActive();
                hbsHelpers.formatDate();
                binder.bindPartials(context)
                    .then(function () {
                        notificator.hideLoading();
                        this.partial('./views/home/home.hbs');
                    });
            })
            .catch(function (error) {
                notificator.hideLoading();
                notificator.handleError(error);
            });
    }

    return {
        index,
        home
    }
})();