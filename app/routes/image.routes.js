/*
Image Routes
Authored by Lee
Created At 2023/3/17
*/
const { authJwt } = require("../middlewares");
const controller = require("../controllers/image.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/image/:type", [authJwt.verifyToken], controller.getImages);
  app.post(
    "/api/image/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createImage
  );
  app.post(
    "/api/image/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateImage
  );
  app.delete(
    "/api/image/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteImage
  );
};
