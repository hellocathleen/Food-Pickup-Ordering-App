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
const cookieSession = require('cookie-session');
const helmet        = require('helmet');


const accountSid  = process.env.TWILIO_ACCOUNT_SID;
const authToken   = process.env.TWILIO_AUTH_TOKEN;
const client      = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twilioNum   = +17784028085;


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(helmet());

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.use(cookieSession({
 name: 'session',
 keys: ['secret-string', 'key2', 'phoneNum'],
}));


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
        res.render("index", templateVars);
    });

});

app.post("/api/users", (req, res) => {
  knex('users')
   .insert(req.body)
   .returning('id')
   .then(function(id){
      res.send(id);
   })

})


//sends order to database
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

const customer = [];

//send the order to the restaurant
app.post("/orderSend", (req, res) => {

  let orderId = req.body.orderId;
  let customerNow = {};
  customerNow['orderId'] = orderId;
  customerNow['phone'] = req.body.phoneNumber;
  customer.push(customerNow);

  let name = req.body.name;
  let phoneNum = req.body.phoneNumber;
  let orderItems = JSON.stringify(req.body.orderItems);
  let totalPrice = req.body.totalPrice;
  let comments = req.body.comments;

  client.messages
    .create({
      from: '+17784028085',
      body: `New Order #${orderId} from:  ${name}, @ ${phoneNum}, ${orderItems} Total Price: ${totalPrice}, special comments: ${comments}`,
      to: '+12506341714'})
    .then(message => console.log(message.sid))
    .done();
    client.messages
          .create({
            to: req.body.phoneNumber,
            from: +'17784028085',
            body: 'Your Hungry Hippo order has been received!'
          })

  res.end();
})



function orderReady(body) {
  const orderId = body.replace(/\D/g, '');
  var phone = null;

  for (let i = 0; i < customer.length; i++) {
    if (customer[i].orderId === orderId) {
      phone = customer[i].phone;
    }
  }

  client.messages.create({
    from: twilioNum,
    to: phone,
    body: body
  })
  .done();
}


//Twilio response route
app.post("/api/restaurantReply", (req, res) => {

  const restText = req.body.Body;
  orderReady(restText);
  res.end()

})


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
