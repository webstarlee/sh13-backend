/*
Profile Controller
Authored by Athena
Created At 2023/3/14
*/

import { User } from "../models";
import { compareSync, hashSync } from "bcryptjs";

export function changeAvatar(req, res) {
  if (!req.body.avatar) {
    return res.status(400).json({
      message: "Avatar field is required",
    });
  }

  User.findById(req.id).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "Can not find User.",
      });
    }

    user.avatar = req.body.avatar;
    user.save().then((user) => {
      res.status(200).json({
        message: "Avatar has been updated successfully!",
        data: user,
      });
    });
  });
}

export function changeUsername(req, res) {
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
}

export function changeFullname(req, res) {
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
}

export function changePassword(req, res) {
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
        hashed = compareSync(req.body.oldPassword, user.password);
        if (!hashed) {
          return res.status(400).json({
            message: "Old password is Incorrect",
          });
        }
        user.password = hashSync(req.body.password, 8);
        user.save().then((user) => {
          return res.status(200).json({
            message: "Password has been changed successfully",
            user: user,
          });
        });
      }
    });
  });
}
