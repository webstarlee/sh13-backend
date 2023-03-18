/*
User Controller
Authored by Lee
Created At 2023/3/10
*/
import { User } from "../models";

export function allAccess(req, res) {
  User.find()
    .populate("roles")
    .then((users) => {
      function getUser() {
        const filteredUsers = users.filter((user) => {
          return (
            user.roles.filter((role) => role.name.toString() === "admin")
              .length === 0
          );
        });
        res.status(200).json({
          message: "Fetched users successfully!",
          data: filteredUsers,
        });
      }
      getUser();
    });
}

export function userBoard(req, res) {
  User.findById(req.id).then((user) => {
    console.log(req.t('auth.invalid_credential'));
    res.status(200).json({ data: user });
  });
}

export function adminBoard(req, res) {
  res.status(200).send("Admin Content.");
}

export function moderatorBoard(req, res) {
  res.status(200).send("Moderator Content.");
}

export function approveUser(req, res) {
  User.findById(req.body.id).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "Can not find User.",
      });
    } else {
      const approve = req.body.approveStatus ? req.body.approveStatus : false;
      user.approved = approve;
      user
        .save()
        .then((user) => {
          res.json({
            message: "User has been changed successfully!",
            data: user,
          });
        })
        .catch((err) => {
          res.json({
            message: err,
          });
        });
    }
  });
}

export function deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.id }).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "Can't find User",
      });
    }
    res.json({
      message: "Deleted user successfully!",
      data: user,
    });
  });
}
