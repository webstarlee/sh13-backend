/*
Seed
Authored by Lee
Created At 2023/3/15
*/
import { hashSync } from "bcryptjs";
import { Role, User } from "../models";

export default async function roleAdminSeed() {
  try {
    Role.estimatedDocumentCount().then(async (count) => {
      if (count === 0) {
        await Role({ name: "user" }).save();
        console.log("added 'user' to roles collection");
        await Role({ name: "admin" })
          .save()
          .then(async (role) => {
            console.log("added 'admin' to roles collection");
            await new User({
              fullname: "Admin",
              username: "admin",
              password: hashSync("sh13", 8),
              approved: true,
              roles: [role._id],
            })
              .save()
              .then((err, user) => {
                console.log("Admin created from seed scripts");
              });
          });
      }
    });
  } catch (err) {
    console.error(err);
  }
}
