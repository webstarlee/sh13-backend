/*
Image Routes
Authored by Lee
Created At 2023/3/17
*/
import { authJwt } from "../middlewares";
import { getImages, createImage, updateImage, deleteImage } from "../controllers/image.controller";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/image/fetch",
    [authJwt.verifyToken],
    getImages
  );
  app.post(
    "/api/image/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    createImage
  );
  
  app.post(
    "/api/image/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateImage
  );
  app.delete(
    "/api/image/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteImage
  );
};
