/*
Email Model
Authored by Ace
Created At 2023/3/14
*/
import { model, Schema } from "mongoose";

const Email = model(
  "Email",
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "alive",
    },
    password: {
      type: String,
      required: true,
    },
    recovery: {
      type: String,
      required: false,
    },
    sms: {
      type: String,
      default: "free",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  })
);

export default Email;
