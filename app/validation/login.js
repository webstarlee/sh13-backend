const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data){

    let errors = {};

    data.userId = !isEmpty(data.userId) ? data.userId : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //userId checks
    if(Validator.isEmpty(data.userId)){
        errors.userId = "userId field is required";
    } 
    //Password checks
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};