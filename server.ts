// import express (after npm install express)
import * as express from 'express';
import * as path from "path";
import * as router from './router';
import * as expressSession from 'express-session';
import * as cookieParser from 'cookie-parser';
import {ShoppingCart} from './ShoppingCart';

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 8080;

app.use(express.json());
app.use(cookieParser());

app.set('trusty proxy', 1);


// Template Setzung mit EJS
app.set('view engine', 'ejs');

// create Session
app.use(
  expressSession(
    {
        secret: 'noCap',
        resave: false,
        saveUnitialized: true,
        cookie: {
          secure: true,
          cart: new ShoppingCart()
        }
    }
  )
);


// set router
app.use('/', router);

// Body-Parser in Express included
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, './assets')));

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
});
