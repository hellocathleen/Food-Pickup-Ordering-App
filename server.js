"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSession = require('cookie-session');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(cookieSession ({
  name: 'session',
  keys: ['secret-string']

}))

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
   knex
      .select("*")
      .from("food_items")
      .then((results) => {

        const stringify = JSON.stringify(results)
        const templateVars = {
          results: JSON.parse(stringify)
        }
        res.render("index", templateVars)
    });

});

app.post("/api/orders", (req, res) => {

})

app.post("/api/cart", (req, res) => {
  console.log(req.body)
  let templateVars = {}
  if (!req.session.cart) {
    req.session['cart'] = req.body;
    console.log('cart: ', req.session.cart)
    let item = req.body.name
    let price = req.body.price
  } else {
    req.session.cart.quantity_of_items.push(req.body.quantity_of_items[0])
    templateVars['item'] = req.body.name
    templateVars['price'] = req.body.price
    console.log('cart: ', req.session.cart)

  }
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
