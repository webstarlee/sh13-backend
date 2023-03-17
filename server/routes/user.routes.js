/*
User Routes
Authored by Lee
Created At 2023/3/10
*/
import { authJwt } from "../middlewares";
import {
  allAccess,
  userBoard,
  approveUser,
  deleteUser,
  moderatorBoard,
  adminBoard
} from "../controllers/user.controller";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", allAccess);
  app.get("/api/user/current", [authJwt.verifyToken], userBoard);
  app.post(
    "/api/user/approve",
    [authJwt.verifyToken, authJwt.isAdmin],
    approveUser
  );
  app.delete(
    "/api/user/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteUser
  );
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );
};
