const orderRoute = require('../controllers/order.controller');
const authenticateRoute = require('../middleware/authentication');
const authorizationRoute = require('../middleware/authorization');

module.exports = function (app) {

    app.post("/orders", authenticateRoute.verifyToken, authorizationRoute.checkUser, orderRoute.createOrder);

}