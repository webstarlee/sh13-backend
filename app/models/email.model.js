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
            default: 'alive',
        },
        password: {
            type: String,
            required: true,
        },
        recovery: {
            type: String,
            required: false,
        },
        sms: {
            type: String,
            default: "free"
        },
        createdAt: {
            type: Date,
            default: new Date(),
        },
    },
    )
);

module.exports = Email;
