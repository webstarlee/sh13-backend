/*
Authentication Routes
Authored by Lee
Created At 2023/3/10
*/
import { verifySignUp } from "../middlewares";
import { signup, signin } from "../controllers/auth.controller";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    signup
  );

  app.post("/api/auth/signin", signin);
};
