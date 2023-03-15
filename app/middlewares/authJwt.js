const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.id = decoded.user._id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.id)
    .populate("roles")
    .then((user) => {
      console.log(user);

      const isAdmin = user.roles.filter(
        (role) => role.name.toString() === "admin"
      ).length;
      if (isAdmin) {
        next();
        return;
      } else {
        res.status(403).send({ message: "Require Admin Role!" });
      }
    });
};

isModerator = (req, res, next) => {
  User.findById(req.username).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
