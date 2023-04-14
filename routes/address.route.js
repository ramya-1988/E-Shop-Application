const addressRoute = require('../controllers/address.controller');
const authenticateRoute = require('../middleware/authentication');
const authorizationRoute = require('../middleware/authorization');

module.exports = function (app) {

    app.post("/addresses", authenticateRoute.verifyToken, authorizationRoute.checkUser, addressRoute.addAddress);
}