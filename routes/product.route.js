const productRoute = require('../controllers/product.controller');
const authenticateRoute = require('../middleware/authentication');
const authorizationRoute = require('../middleware/authorization');

module.exports = function (app) {

    app.post("/products", authenticateRoute.verifyToken, authorizationRoute.checkAdmin, productRoute.saveProduct);

    app.get("/products", productRoute.searchProduct);

    app.get("/products/categories", productRoute.getProduct);

    app.get("/products/id", productRoute.fetchById);

    app.put("/products/id", authenticateRoute.checkAdmin, productRoute.updateProduct);

    app.delete("/products/id", authenticateRoute.checkAdmin, productRoute.deleteProduct);
}