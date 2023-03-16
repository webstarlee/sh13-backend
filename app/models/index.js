/*
Index Model
Authored by Lee
Created At 2023/3/10
*/

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.email = require("./email.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
