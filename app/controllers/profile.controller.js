const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var bcrypt = require("bcryptjs");

exports.changeUsername = (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({
      message: "username field is required",
    });
  }
  User.findById(req.id).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "Can not find User.",
      });
    } else {
      user.username = req.body.username;
      user.save().then((user) => {
        res.status(200).json({
          message: "username has changed successfully!",
          data: user,
        });
      });
    }
  });
};

exports.changeFullname = (req, res) => {
  if (!req.body.fullname) {
    return res.status(400).json({
      message: "fullname field is required",
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
          message: "fullname has changed successfully!",
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
            message: "old password is not correct",
          });
        }
        user.password = bcrypt.hashSync(req.body.password, 8);
        user.save().then((user) => {
          return res.status(200).json({
            message: "Password has changed successfully",
            user: user,
          });
        });
      }
    });
  });
};
