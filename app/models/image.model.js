/*
Image Model
Authored by Lee
Created At 2023/3/17
*/
const mongoose = require("mongoose");

const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    type: {
      type: String,
      default: "normal",
    },
    path: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  })
);

module.exports = Image;
