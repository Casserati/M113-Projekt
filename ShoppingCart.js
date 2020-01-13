"use strict";
exports.__esModule = true;
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.total = 0.00;
        this.products = [];
        this.products = new Array();
    }
    ShoppingCart.prototype.getTotal = function () {
        return this.total;
    };
    ShoppingCart.prototype.addToTotal = function (price) {
        this.total += price;
    };
    ShoppingCart.prototype.addToCart = function (product) {
        this.addToTotal(product.specialOffer);
        product.amount = 1;
        console.log(this.products.find(function (p) { return p.id === product.id; }));
        if (this.products.find(function (p) { return p.id === product.id; }) != undefined) {
            this.incrementProductAmount(product);
        }
        else {
            console.log("niggers");
            this.products.push(product);
        }
    };
    ShoppingCart.prototype.getCart = function () {
        return this;
    };
    ShoppingCart.prototype.removeFromCart = function (product) {
        this.products.splice(product);
    };
    ShoppingCart.prototype.incrementProductAmount = function (product) {
        var productToIncrement = this.products.find(function (p) { return product.id == product.id; });
        productToIncrement.amount++;
    };
    ShoppingCart.prototype.decrementProductAmount = function (product) {
        var productToIncrement = this.products.find(function (p) { return product.id == product.id; });
        if (productToIncrement.amount--) {
            this.removeFromCart(product);
        }
    };
    return ShoppingCart;
}());
exports.ShoppingCart = ShoppingCart;
