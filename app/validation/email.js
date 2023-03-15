const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function ValidateEmailInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.recovery = !isEmpty(data.recovery) ? data.recovery : "";
  data.sms = !isEmpty(data.sms) ? data.sms : "";
  data.createdAt = !isEmpty(data.createdAt) ? data.createdAt : "";

  //email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  //Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  //Status checks
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  //Recovery Email checks
  if (Validator.isEmpty(data.recovery)) {
    errors.recovery = "Recovery Email field is required";
  }
  //SMS checks
  if (Validator.isEmpty(data.sms)) {
    errors.sms = "SMS field is required";
  }
  //Created At checks
  if (Validator.isEmpty(data.recovery)) {
    errors.createdAt = "CreatedAt field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
