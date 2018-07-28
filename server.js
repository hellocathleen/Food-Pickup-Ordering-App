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
const Cookies     = require('js-cookie');

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

}));

//

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

  res.redirect('/')
})

// app.get("/api/cart", (req, res) => {
//   let cartOrder = req.session.cart
//   console.log(cartOrder)
//   res.render('index', cartOrder)
// })

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
