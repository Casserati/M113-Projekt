"use strict";
exports.__esModule = true;
var express = require("express");
var products = require("./products.json");
var cookieParser = require("cookie-parser");
var router = express.Router();
router.use(cookieParser());
router.get('/checkout', function (req, res) {
    res.render('/checkout');
});
router.get('/cart', function (req, res) {
    res.render('/cart');
});
router.get('/', function (req, res) {
    res.render(__dirname + '/index.ejs', { products: products, total: req.session.cookie.cart.getTotal() });
});
router.get('/index', function (req, res) {
    res.render(__dirname + '/index.ejs', { products: products, total: req.session.cookie.cart.getTotal() });
});
router.get('/product/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    res.render(__dirname + '/item.ejs', { product: product, total: req.session.cookie.cart.getTotal() });
});
router.post('/product/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    req.session.cookie.cart.addToCart(product);
    console.log(req.session.cookie.cart);
    res.render(__dirname + '/index', { products: products, total: req.session.cookie.cart.getTotal() });
});
router.get('/products/getProduct/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    req.session.product = product;
    res.json(req.session.product);
});
router.get('/products/getJson', function (req, res) {
    res.json(products);
});
function loadProduct(id) {
    return products.find(function (p) { return p.id.toString() === id; });
}
module.exports = router;
