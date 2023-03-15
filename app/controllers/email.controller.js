const db = require("../models");
const Email = db.email;
// Load input validation
const ValidateEmailInput = require("../validation/email");

exports.getEmails = (req, res) => {
  Email.find()
    .populate("user")
    .exec((err, email) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        data: email,
        message: "Email fetch success",
      });
    });
};

exports.createEmail = (req, res) => {
  const { errors, isValid } = ValidateEmailInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Email.findOne({ email: req.body.email }).then((email, err) => {
    if (email) {
      console.log(err);
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

      newEmail.save();
      res
        .status(200)
        .send({ message: "New email account added successfully!" });
    }
  });
};

exports.updateEmail = (req, res) => {
  console.log(req.body);
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
    },
    function (err, updatedData) {
      if (err) {
        return res.status(400).json({
          message: err,
        });
      } else {
        res.status(200).send({
            data: updatedData,
            message: "Email account updated successfully!"
        });
      }
    }
  );
};

exports.deleteEmail = (req, res) => {
  Email.findOneAndRemove({ _id: req.params.id }).exec(() => {
    res.status(200).send({ message: "Delete Success" });
  });
};
