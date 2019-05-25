const storage = require('../helpers/storage');
const hbsHelpers = require('../helpers/hbsHelpers');

module.exports = (() => {

    function bindFormToObj(sammyObj) {
        return Object.getOwnPropertyNames(sammyObj)
            .reduce((acc, cur) => {
                acc[cur] = sammyObj[cur];

                return acc;
            }, {});
    }

    function bindPartials(context, extraPartialsObj) {
        context.isLoggedIn = storage.getData('authToken') !== null;
        context.username = storage.getData('username');
        hbsHelpers.isActive();

        let partials = {
            nav: 'views/common/nav.hbs',
            footer: 'views/common/footer.hbs'
        };

        if (extraPartialsObj) {
            for (let key in extraPartialsObj) {
                partials[key] = extraPartialsObj[key];
            }
        }

        return context.loadPartials(partials)
    }

    return {
        bindFormToObj,
        bindPartials
    }
})();