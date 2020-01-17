"use strict";
exports.__esModule = true;
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.total = 0.00;
        this.products = [];
        this.products = new Array();
    }
    ShoppingCart.prototype.getTotal = function () {
        this.calculateTotal();
        return this.total;
    };
    ShoppingCart.prototype.addToCart = function (product) {
        if (this.products.find(function (p) { return p.id === product.id; }) != undefined) {
            this.incrementProductAmount(product);
        }
        else {
            product.amount = 1;
            this.products.push(product);
        }
        this.calculateTotal();
    };
    ShoppingCart.prototype.getCart = function () {
        return this;
    };
    ShoppingCart.prototype.clearProducts = function () {
        this.products = [];
    };
    ShoppingCart.prototype.calculateTotal = function () {
        var _this = this;
        this.total = 0;
        this.products.forEach(function (p) {
            _this.total += p.amount * p.specialOffer;
        });
        this.total.toFixed(2);
    };
    ShoppingCart.prototype.removeFromCart = function (product) {
        var index = this.products.findIndex(function (p) { return p.id == product.id; });
        this.products.splice(index, 1);
    };
    ShoppingCart.prototype.incrementProductAmount = function (product) {
        var productToIncrement = this.products.find(function (p) { return p.id == product.id; });
        productToIncrement.amount++;
        this.total += product.specialOffer;
        this.calculateTotal();
    };
    ShoppingCart.prototype.decrementProductAmount = function (product) {
        console.log(product.id);
        var productToIncrement = this.products.find(function (p) { return p.id == product.id; });
        this.total -= product.specialOffer;
        console.log(productToIncrement.id);
        if (productToIncrement.amount-- === 1) {
            this.removeFromCart(productToIncrement);
        }
        this.calculateTotal();
    };
    return ShoppingCart;
}());
exports.ShoppingCart = ShoppingCart;
