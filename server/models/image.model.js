/*
Image Model
Authored by Lee
Created At 2023/3/17
*/
import { model, Schema } from "mongoose";

const Image = model(
  "Image",
  new Schema({
    type: {
      type: String,
      default: "normal",
    },
    path: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  })
);

export default Image;
