/*
Email Model
Authored by Lee
Created At 2023/3/10
*/
import { model, Schema } from "mongoose";

const Role = model(
  "Role",
  new Schema({
    name: String,
  })
);

export default Role;
