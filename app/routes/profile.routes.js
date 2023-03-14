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
    "/api/profile/changeFullname",
    [authJwt.verifyToken],
    controller.changeFullname
  );
  app.post(
    "/api/profile/changeUsername",
    [authJwt.verifyToken],
    controller.changeUsername
  );
  app.post(
    "/api/profile/changePassword",
    [authJwt.verifyToken],
    controller.changePassword
  );
};
