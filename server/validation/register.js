/*
Register validator
Authored by Lee
Created At 2023/3/10
*/
import { isEmpty as _isEmpty, isLength, equals } from "validator";
import isEmpty from "is-empty";

export default function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  //Name checks
  if (_isEmpty(data.fullname)) {
    errors.fullname = "Name field is required";
  }

  //username checks
  if (_isEmpty(data.username)) {
    errors.username = "username field is required";
  }

  //Password checks
  if (_isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (_isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  }

  if (!isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
