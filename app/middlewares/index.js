/*
Index Middleware
Authored by Lee
Created At 2023/3/10
*/
const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

module.exports = {
  authJwt,
  verifySignUp
};
