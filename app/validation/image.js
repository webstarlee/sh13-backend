/*
Image validator
Authored by Lee
Created At 2023/3/17
*/
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function ValidateImageInput(data) {
  let errors = {};
  data.type = !isEmpty(data.type) ? data.type : "";
  data.path = !isEmpty(data.path) ? data.path : "";
  data.createdAt = !isEmpty(data.createdAt) ? data.createdAt : "";

  //file checks
  if (Validator.isEmpty(data.file)) {
    errors.file = "File field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
