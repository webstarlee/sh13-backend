const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var bcrypt = require("bcryptjs");

exports.changeUsername = (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({
      message: "Username field is required",
    });
  }

  User.findById(req.id).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "Can not find User.",
      });
    } else {
      User.findOne({ username: req.body.username }).then((existedUser) => {
        if (existedUser && user.username !== req.body.username) {
          return res.status(400).json({
            message: "Username has already existed!",
          });
        } else {
          user.username = req.body.username;
          user.save().then((user) => {
            res.status(200).json({
              message: "Username has been changed successfully!",
              data: user,
            });
          });
        }
      });
    }
  });
};

exports.changeFullname = (req, res) => {
  if (!req.body.fullname) {
    return res.status(400).json({
      message: "Fullname field is required",
    });
  }
  User.findById(req.id).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "Can not find User.",
      });
    } else {
      user.fullname = req.body.fullname;
      user.save().then((user) => {
        res.status(200).json({
          message: "Fullname has been changed successfully!",
          data: user,
        });
      });
    }
  });
};

exports.changePassword = (req, res) => {
  User.findById(req.id).then((user) => {
    if (!req.body.oldPassword) {
      return res.status(400).json({
        message: "Old password field is required",
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        message: "Password field is required",
      });
    }
    if (!req.body.confirmPassword) {
      return res.status(400).json({
        message: "Confirm password field is required",
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm must be matched",
      });
    }
    User.findById(req.id).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "Can not find User.",
        });
      } else {
        hashed = bcrypt.compareSync(req.body.oldPassword, user.password);
        if (!hashed) {
          return res.status(400).json({
            message: "Old password is Incorrect",
          });
        }
        user.password = bcrypt.hashSync(req.body.password, 8);
        user.save().then((user) => {
          return res.status(200).json({
            message: "Password has been changed successfully",
            user: user,
          });
        });
      }
    });
  });
};
