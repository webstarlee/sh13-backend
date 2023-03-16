/*
Profile Routes
Authored by Athena
Created At 2023/3/14
*/
const { authJwt } = require("../middlewares");
const controller = require("../controllers/profile.controller");

module.exports = function (app) {
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
    controller.changeFullname
  );
  app.post(
    "/api/profile/change/username",
    [authJwt.verifyToken],
    controller.changeUsername
  );
  app.post(
    "/api/profile/change/password",
    [authJwt.verifyToken],
    controller.changePassword
  );
};
