/*
Image Controller
Authored by Lee
Created At 2023/3/17
*/
import { Image } from "../models";
import base64Img from "../modules/base64Img";
import fs from "fs";
import ValidateImageInput from "../validation/image";

export function getImages(req, res) {
  Image.find().then((images) => {
    if (!images) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      data: images,
      message: "Image fetch success",
    });
  });
}

export function createImage(req, res) {
  const { errors, isValid } = ValidateImageInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  base64Img.img(
    req.body.file,
    "./public/uploads/images",
    Date.now(),
    function (err, filepath) {
      const pathArr = filepath.split("/");
      const path = pathArr[pathArr.length - 1].replace("public", "");

      const newImage = new Image({
        path: path,
      });

      newImage.save().then((image) => {
        res.status(200).send({
          data: image,
          message: "New Image uploaded succesfully!",
        });
      });
    }
  );
}

export function updateImage(req, res) {
  Image.findById(req.body.id)
    .then((image) => {
      if(!image) {
        return res.status(404).json({
          message: "Can not find Image.",
        });
      }

      fs.unlink('./public'+image.path, (err) => {
        if (err) {
          console.log("Delete File successfully.");
        }

        base64Img.img(
          req.body.file,
          "./public/uploads/images",
          Date.now(),
          function (err, filepath) {
            const pathArr = filepath.split("/");
            const path = pathArr[pathArr.length - 1].replace("public", "");

            image.type = req.body.type;
            image.path = path;

            image.save().then((updatedData) => {
              res.status(200).send({
                data: updatedData,
                message: "Image updated succesfully!",
              });
            });
          }
        );
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
}

export function deleteImage(req, res) {
  Image.findOneAndDelete({ _id: req.params.id }).then((image) => {
    if (!image) {
      return res.status(404).json({
        message: "Can't find Image",
      });
    }
    res.json({
      message: "Deleted image successfully!",
    });
  });
}
