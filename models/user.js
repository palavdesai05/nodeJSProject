let mongoose = require('mongoose');
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    license_no: String,
    age: Number,
    username: String,
    userType: String,
    password: String,
    appointmentType: String,
    comment: String,
    testResult: String,
    appointmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment"
    },
    car_details: {
    make: String,
    model: String,
    year: Number,
    platno: String,
    }
});

userSchema.pre("save", function (next) {
    const drive = this;
    bcrypt.hash(drive.password, 10, (error, hash) => {
      drive.password = hash;
      next();
    });
});
module.exports = mongoose.model('user', userSchema);