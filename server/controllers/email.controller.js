/*
Email Controller
Authored by Ace
Created At 2023/3/14
*/
import { Email } from "../models";
import ValidateEmailInput from "../validation/email";

export function getEmails(req, res) {
  Email.find()
    .populate("user")
    .exec().then((email) => {
      res.status(200).send({
        data: email,
        message: "Email fetch success",
      });
    });
}

export function createEmail(req, res) {
  const { errors, isValid } = ValidateEmailInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Email.findOne({ email: req.body.email }).then((email, err) => {
    if (email) {
      return res.status(400).json({
        message: "Email has already registered!",
      });
    } else {
      const newEmail = new Email({
        user: req.id,
        email: req.body.email,
        status: req.body.status,
        password: req.body.password,
        recovery: req.body.recovery,
        sms: req.body.sms,
        createdAt: req.body.createdAt,
      });

      newEmail.save(),then((email) => {
        res.status(200)
        .send({ message: "New email account added successfully!" });
      });
    }
  });
}

export function updateEmail(req, res) {
  Email.findByIdAndUpdate(
    req.body.id,
    {
      $set: {
        user: req.id,
        email: req.body.email,
        status: req.body.status,
        password: req.body.password,
        recovery: req.body.recovery,
        sms: req.body.sms,
        createdAt: req.body.createdAt,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    }).then((updatedData) => {
      res.status(200).send({
        data: updatedData,
        message: "Email account updated successfully!",
      });
    }).catch((err) => {
      res.json({
        message: err,
      });
    });
}

export function deleteEmail(req, res) {
  Email.findOneAndRemove({ _id: req.params.id }).exec(() => {
    res.status(200).send({ message: "Delete Success" });
  });
}
