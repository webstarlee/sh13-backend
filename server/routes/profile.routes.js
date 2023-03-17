/*
Profile Routes
Authored by Athena
Created At 2023/3/14
*/
import { authJwt } from "../middlewares";
import { changeFullname, changeUsername, changePassword } from "../controllers/profile.controller";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/profile/change/fullname",
    [authJwt.verifyToken],
    changeFullname
  );
  app.post(
    "/api/profile/change/username",
    [authJwt.verifyToken],
    changeUsername
  );
  app.post(
    "/api/profile/change/password",
    [authJwt.verifyToken],
    changePassword
  );
};
