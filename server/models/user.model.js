/*
User Model
Authored by Lee
Created At 2023/3/10
*/
import { model, Schema } from "mongoose";

const User = model(
  "User",
  new Schema({
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false
    },
    password: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

export default User;
