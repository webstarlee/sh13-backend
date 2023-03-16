/*
Email Model
Authored by Lee
Created At 2023/3/10
*/
const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Role;
