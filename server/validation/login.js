/*
Login validator
Authored by Lee
Created At 2023/3/10
*/
import { isEmpty as _isEmpty } from "validator";
import isEmpty from "is-empty";

export default function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //username checks
  if (_isEmpty(data.username)) {
    errors.username = "username field is required";
  }
  //Password checks
  if (_isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
