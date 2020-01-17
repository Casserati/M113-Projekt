"use strict";
exports.__esModule = true;
var express = require("express");
var products = require("./products.json");
var cookieParser = require("cookie-parser");
var router = express.Router();
router.use(cookieParser());
router.get('/', function (req, res) {
    res.render(__dirname + '/views/index.ejs', { products: products, total: req.session.cookie.cart.getTotal() });
});
router.get('/index', function (req, res) {
    res.render(__dirname + '/views/index.ejs', { products: products, total: req.session.cookie.cart.getTotal() });
});
router.get('/product/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    res.render(__dirname + '/views/item.ejs', { product: product, total: req.session.cookie.cart.getTotal() });
});
router.post('/product/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    req.session.cookie.cart.addToCart(product);
    res.redirect('/index');
});
router.get('/products/getProduct/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    req.session.product = product;
    res.json(req.session.product);
});
router.get('/product/increment/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    req.session.cookie.cart.incrementProductAmount(product);
    res.redirect('/views/cart');
});
router.get('/product/decrement/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    req.session.cookie.cart.decrementProductAmount(product);
    res.redirect('/views/cart');
});
router.get('/products/getJson', function (req, res) {
    res.json(products);
});
router.get('/views/cart', function (req, res) {
    res.render(__dirname + '/views/cart.ejs', { products: req.session.cookie.cart.getCart().products, total: req.session.cookie.cart.getTotal() });
});
router.get('/views/checkout', function (req, res) {
    res.render(__dirname + '/views/checkout.ejs', { products: req.session.cookie.cart.getCart().products, total: req.session.cookie.cart.getTotal() });
});
router.post('/views/checkout', function (req, res) {
    console.log("Vielen Dank für Ihren Einkauf! Ihr Einkauf betrug:" + req.session.cookie.cart.getTotal());
    req.session.cookie.cart.clearProducts();
    res.redirect("/");
});
function loadProduct(id) {
    return products.find(function (p) { return p.id.toString() === id; });
}
module.exports = router;
