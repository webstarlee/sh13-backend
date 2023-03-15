const mongoose = require("mongoose");

const Email = mongoose.model(
    "Email",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        email: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'true',
        },
        password: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        }
    },
    )
);

module.exports = Email;
