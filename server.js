"use strict";
exports.__esModule = true;
// import express (after npm install express)
var express = require("express");
var path = require("path");
var router = require("./router");
var expressSession = require("express-session");
var cookieParser = require("cookie-parser");
var ShoppingCart_1 = require("./ShoppingCart");
// create new express app and save it as "app"
var app = express();
// server configuration
var PORT = 8080;
app.use(express.json());
app.use(cookieParser());
app.set('trusty proxy', 1);
// Template Setzung mit EJS
app.set('view engine', 'ejs');
// create Session
app.use(expressSession({
    secret: 'noCap',
    resave: false,
    saveUnitialized: true,
    cookie: {
        secure: true,
        cart: new ShoppingCart_1.ShoppingCart()
    }
}));
// set router
app.use('/', router);
// Body-Parser in Express included
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, './assets')));
// make the server listen to requests
app.listen(PORT, function () {
    console.log("Server running: http://localhost:" + PORT + "/");
});
