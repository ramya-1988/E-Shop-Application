const userRoute = require('../controllers/auth.controller');
const authenticateRoute = require('../middleware/authentication');

module.exports = function (app) {

    app.post("/users", userRoute.signup);

    app.post("/auth", userRoute.signin);

}