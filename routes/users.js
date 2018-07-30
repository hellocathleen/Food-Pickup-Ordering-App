"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post('/api/users', (req, res) => {
    console.log(data)
   knex('users')
   .insert(data)
   .then((results) => {
     res.json(results);
     console.log("we inserted and got: ", results)
    });
  });

  return router;
}
