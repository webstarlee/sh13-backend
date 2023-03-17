/*
Email Routes
Authored by Ace
Created At 2023/3/14
*/
import { authJwt } from "../middlewares";
import { getEmails, createEmail, updateEmail, deleteEmail } from "../controllers/email.controller";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/email/all/", getEmails);
  app.post("/api/email/create", [authJwt.verifyToken], createEmail);
  app.post("/api/email/update", [authJwt.verifyToken], updateEmail);
  app.delete(
    "/api/email/delete/:id",
    [authJwt.verifyToken],
    deleteEmail
  );
};
