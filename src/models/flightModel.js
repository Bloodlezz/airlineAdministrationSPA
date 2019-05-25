const requester = require('../helpers/requester');

module.exports = (() => {

    function getAllFlights() {
        return requester.get('appdata', 'flights?query={"public":1}', 'kinvey');
    }

    function createFlight(flightData) {
        return requester.post('appdata', 'flights', 'kinvey', flightData);
    }

    function getFlightDetails(id) {
        return requester.get('appdata', `flights/${id}`, 'kinvey');
    }

    function editFlight(flightData) {
        return requester.update('appdata', `flights/${flightData._id}`, 'kinvey', flightData);
    }

    function getUserFlights(userId) {
        return requester.get('appdata', `flights?query={"_acl.creator":"${userId}"}`, 'kinvey');
    }
    
    function deleteFlight(id) {
        return requester.remove('appdata', `flights/${id}`, 'kinvey');
    }

    return {
        getAllFlights,
        createFlight,
        getFlightDetails,
        editFlight,
        getUserFlights,
        deleteFlight
    }
})();