/*
Authentication Controller
Authored by Lee
Created At 2023/3/10
*/
import { secret } from "../config/auth.config";
import { User, Role } from "../models";
import validateRegisterInput from "../validation/register";
import validateLoginInput from "../validation/login";
import { sign } from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";

export function signup(req, res) {
  //Form validation
  const { errors, isValid } = validateRegisterInput(req);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    password: hashSync(req.body.password, 8),
  });

  user.save().then((user) => {
    if (req.body.roles) {
      Role.find({name: { $in: req.body.roles }})
      .then((roles) => {
          user.roles = roles.map((role) => role._id);
          user.save().then((final) => {
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" })
      .then((role) => {
        user.roles = [role._id];
        user.save().then((final) => {
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
}

export function signin(req, res) {
  //Form Valdiation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec().then((user) => {
      if (!user) {
        return res.status(404).send({ message: req.t('auth.invalid_credential') });
      }

      var passwordIsValid = compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: req.t('auth.invalid_credential'),
        });
      }

      if (!user.approved) {
        return res.status(401).send({
          message: "User was not approved yet!",
        });
      }

      var token = sign(
        {
          user: user,
        },
        secret,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        user: {
          id: user._id,
          fullname: user.fullname,
          username: user.username,
          roles: authorities,
        },
        accessToken: token,
      });
    });
}
