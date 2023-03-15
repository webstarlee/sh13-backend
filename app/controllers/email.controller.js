const db = require("../models");
const Email = db.email;
// Load input validation
const ValidateEmailInput = require("../validation/email");

exports.getEmails = (req, res) => {
    Email.find()
        .populate('username')
        .exec((err, email) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send({ email: email });
        });
};

exports.createEmail = (req, res) => {
    const { errors, isValid } = ValidateEmailInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newEmail = new Email({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        user: req.user.id,
        status: req.body.status,
    });

    newEmail.save()
    return res.status(200).send({ message: "Success" })
};

exports.updateEmail = (req, res) => {
    Email.findByIdAndUpdate(req.body.id, {
        $set: {
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            status: req.body.status,
            user: req.user.id,
        }
    },
        {

            new: true,
            useFindAndModify: false
        },
        function (err, updatedData) {
            if (err) {
                return res.send('Error updating');
            } else {
                return res.status(200).send(updatedData);
            }
        }
    );
};

exports.deleteEmail = (req, res) => {
    Email.findOneAndRemove({ _id: req.params.id })
        .exec(() => {
            res.status(200).send({ message: 'Delete Success' })
        })
};