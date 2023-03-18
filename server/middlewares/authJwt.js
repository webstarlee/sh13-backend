/*
Authentication Middleware
Authored by Lee
Created At 2023/3/10
*/
import { verify } from "jsonwebtoken";
import { secret } from "../config/auth.config.js";
import { User, Role } from "../models";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.id = decoded.user._id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.id)
    .populate("roles")
    .then((user) => {
      if (user) {
        const isAdmin = user.roles.filter(
          (role) => role.name.toString() === "admin"
        ).length;
        if (isAdmin) {
          next();
          return;
        } else {
          res.status(403).send({ message: "Require Admin Role!" });
        }
      } else {
        return res.status(401).send({ message: "Unauthorized!" });
      }
    });
};

const isModerator = (req, res, next) => {
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

export default authJwt;
