/*
Index Model
Authored by Lee
Created At 2023/3/10
*/

import mongoose, {Promise} from "mongoose";
mongoose.Promise = global.Promise;

export default mongoose;
export const ROLES = ["user", "admin"];
export { default as User } from "./user.model";
export { default as Role } from "./role.model";
export { default as Email } from "./email.model";
export { default as Image } from "./image.model";
