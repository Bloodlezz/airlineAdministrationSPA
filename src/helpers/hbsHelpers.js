const Handlebars = require('../../node_modules/handlebars/dist/handlebars.min');
const storage = require('../helpers/storage');

module.exports = (() => {

    function isActive() {
        Handlebars.registerHelper('isActive', function (hash) {
            return window.location.hash === hash ? 'active' : '';
        });
    }

    function formatDate() {
        Handlebars.registerHelper('formatDate', function (date) {
            let currentDate = new Date(date);
            const options = {day: 'numeric', month: 'long'};
            return currentDate.toLocaleDateString('en-GB', options);
        });
    }

    function isChecked() {
        Handlebars.registerHelper('isChecked', function (value) {
            return value === 1 ? 'checked' : '';
        });
    }

    function isAuthor() {
        Handlebars.registerHelper('isAuthor', function (creatorId) {
            return storage.getData('userId') === creatorId;
        });
    }

    return {
        isActive,
        formatDate,
        isChecked,
        isAuthor
    }
})();