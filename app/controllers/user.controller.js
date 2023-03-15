const db = require("../models");
const User = db.user;
exports.allAccess = (req, res) => {
  User.find()
    .populate("roles")
    .then((users) => {
      async function getUser() {
        const filteredUsers = await users.filter((user) => {
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
};

exports.userBoard = (req, res) => {
  User.findById(req.id).then((user) => {
    res.status(200).json({ data: user });
  });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.approveUser = (req, res) => {
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
};

exports.deleteUser = (req, res) => {
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
};
