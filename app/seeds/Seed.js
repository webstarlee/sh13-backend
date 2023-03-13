var bcrypt = require("bcryptjs");
const db = require("../models");
const Role = db.role;
const User = db.user;

exports.roleAdminSeed = async () => {
  try {
    await Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'user' to roles collection");
        });

        new Role({
          name: "admin",
        }).save((err, role) => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'admin' to roles collection");

          new User({
            fullname: "Admin",
            username: "admin",
            password: bcrypt.hashSync("sh13", 8),
            approved: true,
            roles: [role._id],
          }).save((err, user) => {
            if (err) {
              console.log("error", err);
            }

            console.log("Admin created from seed scripts");
          });
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
};
