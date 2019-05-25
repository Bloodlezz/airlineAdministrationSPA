import Sammy from '../node_modules/sammy/lib/sammy';
import '../node_modules/sammy/lib/plugins/sammy.handlebars';

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const flightController = require('./controllers/flightController');

$(() => {
    const app = Sammy('#container', router);

    app.run('#/');
});

function router() {
    this.use('Handlebars', 'hbs');

    this.route('get', '#/', homeController.index);
    this.route('get', '#/home', homeController.home);

    this.route('get', '#/user/register', userController.getRegister);
    this.route('post', '#/user/register', userController.postRegister);

    this.route('get', '#/user/login', userController.getLogin);
    this.route('post', '#/user/login', userController.postLogin);

    this.route('get', '#/user/logout', userController.logout);

    this.route('get', '#/flight/add', flightController.getAdd);
    this.route('post', '#/flight/add', flightController.postAdd);

    this.route('get', '#/flight/details/:id', flightController.getDetails);

    this.route('get', '#/flight/edit/:id', flightController.getEdit);
    this.route('post', '#/flight/edit/:id', flightController.postEdit);
    this.route('get', '#/flight/delete/:id', flightController.deleteFlight);

    this.route('get', '#/user/myFlights', userController.getMyFlights);
}