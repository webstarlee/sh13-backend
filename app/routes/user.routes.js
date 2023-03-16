/*
User Routes
Authored by Lee
Created At 2023/3/10
*/
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", controller.allAccess);

  app.get("/api/user/current", [authJwt.verifyToken], controller.userBoard);
  app.post(
    "/api/user/approve",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.approveUser
  );
  app.delete(
    "/api/user/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
