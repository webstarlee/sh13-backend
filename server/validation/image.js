/*
Image validator
Authored by Lee
Created At 2023/3/17
*/
import { isEmpty as _isEmpty } from "validator";
import isEmpty from "is-empty";

export default function ValidateImageInput(data) {
  let errors = {};

  //file checks
  if (_isEmpty(data.file)) {
    errors.file = "File field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
