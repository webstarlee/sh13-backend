const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.userId = !isEmpty(data.userId) ? data.userId : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    //Name checks
    if(Validator.isEmpty(data.username)) {
        errors.username = "Name field is required";
    }

    //userId checks
    if(Validator.isEmpty(data.userId)){
        errors.userId = "userId field is required";
    }

    //Password checks
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    if(Validator.isEmpty(data.confirmPassword)){
        errors.confirmPassword = "Confirm Password field is required";
    }

    if(!Validator.isLength(data.password,{min:6,max:30})){
        errors.password = "Password must be at least 6 characters";
    }

    if(!Validator.equals(data.password,data.confirmPassword)){
        errors.confirmPassword = "Passwords must match";
    }

    return{
        errors,
        isValid:isEmpty(errors)
    };

};