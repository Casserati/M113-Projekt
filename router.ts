import * as express from 'express';
import * as products from './products.json';
import * as cookieParser from 'cookie-parser';
import alert from 'alert-node';

var router = express.Router();

router.use(cookieParser());

router.get('/', (req, res) => {
    res.render(__dirname + '/views/index.ejs', { products: products, total: req.session.cookie.cart.getTotal()});
});
router.get('/index', (req, res) => {
    res.render(__dirname + '/views/index.ejs', { products: products,  total: req.session.cookie.cart.getTotal()});
});
router.get('/product/:id', (req, res) => {
    const product = loadProduct(req.params.id);

    res.render(__dirname + '/views/item.ejs', {product: product, total: req.session.cookie.cart.getTotal()});
});

router.post('/product/:id', (req, res) => {
    const product = loadProduct(req.params.id);

    req.session.cookie.cart.addToCart(product);
    res.redirect('/index');
});

router.get('/products/getProduct/:id', (req, res) => {
    const product = loadProduct(req.params.id);

    req.session.product = product;

    res.json(req.session.product);
});

router.get('/product/increment/:id', (req,res) => {
    const product = loadProduct(req.params.id);

    req.session.cookie.cart.incrementProductAmount(product);

    res.redirect('/views/cart');
})

router.get('/product/decrement/:id', (req,res) => {
    const product = loadProduct(req.params.id);

    req.session.cookie.cart.decrementProductAmount(product);

    res.redirect('/views/cart');
})

router.get('/products/getJson', (req, res) => {
    res.json(products);
});

router.get('/views/cart', (req, res) =>{
    res.render(__dirname + '/views/cart.ejs', {products: req.session.cookie.cart.getCart().products,  total: req.session.cookie.cart.getTotal()});
});

router.get('/views/checkout', (req, res) =>{
    res.render(__dirname + '/views/checkout.ejs', {products: req.session.cookie.cart.getCart().products,  total: req.session.cookie.cart.getTotal()});
});

router.post('/views/checkout', (req, res) =>{
    console.log("Vielen Dank für Ihren Einkauf! Ihr Einkauf betrug:" + req.session.cookie.cart.getTotal());
    req.session.cookie.cart.clearProducts();
    res.redirect("/");
});

function loadProduct(id: string){
    return products.find(p => p.id.toString() === id);
}

module.exports = router;