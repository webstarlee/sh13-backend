/*
Register Middleware
Authored by Lee
Created At 2023/3/10
*/

import { User, ROLES } from "../models";

const checkDuplicateUsername = (req, res, next) => {
  // username
  User.findOne({
    username: req.body.username,
  }).exec().then((user) => {
    if (user) {
      res.status(400).send({ message: "Failed! username is already in use!" });
      return;
    }
    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsername,
  checkRolesExisted,
};

export default verifySignUp;
