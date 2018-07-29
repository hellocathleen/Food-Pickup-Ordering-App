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
const Cookies     = require('js-cookie');


const accountSid  = process.env.TWILIO_ACCOUNT_SID;
const authToken   = process.env.TWILIO_AUTH_TOKEN;
const client      = require('twilio')(accountSid, authToken);
const messageResponse = require('twilio').twiml.MessagingResponse;
const twilioNum   = +17784028085;

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));



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

app.post("/api/users", (req, res) => {
  console.log("we are in the route on server.js", req.body)
  knex('users')
   .insert(req.body)
   .returning('id')
   .then(function(id){
      res.send(id)
   })

})



app.post("/api/orders", (req, res) => {
  knex('orders')
  .insert(req.body)
  .returning('id')
  .then(function(orderId){
    res.send(orderId)
  })

})

app.get("/api/orders", (req, res) => {
   knex
   .select("*")
   .from("orders")
   .then((results) => {
     res.json(results);
 });
});

//send the order to the restaurant
app.post("/api/twilioSend", (req, res) => {
  console.log(req.body)
  let name = req.body.name;
  let phoneNum = req.body.phoneNumber
  let orderItems = JSON.stringify(req.body.orderItems)
  let totalPrice = req.body.totalPrice
  client.messages.create({
    to: phoneNum,
    from: twilioNum,
    body: `New Order received from:  ${name}, @ ${phoneNum}, ${orderItems}  Total Price: ${totalPrice}`
  })
  .then((message) => console.log(message.sid))
  .done()
  res.end()
})

// client.messages.create({
//     to: +12506341714,
//     from: twilioNum,
//     body: "This is working!!"
//   })
//   .then((message) => console.log(message.sid))
//   .done()



// process.env.PHONE
//

app.post("/api/restaurantSend", (req, res) => {
  const twiml = new messageResponse();

  twiml.message(req.body);

  res.end(twiml.toString())
})




// app.get("/api/cart", (req, res) => {
//   let cartOrder = req.session.cart
//   console.log(cartOrder)
//   res.render('index', cartOrder)
// })

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
