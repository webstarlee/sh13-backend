/*
Email Routes
Authored by Ace
Created At 2023/3/14
*/
const { authJwt } = require("../middlewares");
const controller = require("../controllers/email.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/email/all/", controller.getEmails);
  app.post("/api/email/create", [authJwt.verifyToken], controller.createEmail);
  app.post("/api/email/update", [authJwt.verifyToken], controller.updateEmail);
  app.delete(
    "/api/email/delete/:id",
    [authJwt.verifyToken],
    controller.deleteEmail
  );
};
