"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("food_items")
      .then((results) => {
        res.json(results);
    });

  // router.post("/api/orders", (req, res) => {
  //   knex('orders')
  //   .returning('id')
  //   .insert(data)
  //   .whereNotExists(function() )
  //   .then((orderId) => {
  //     res.json(orderId)
  //   }
  // })

  });

  return router;
}
