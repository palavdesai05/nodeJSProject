const Appointment = require("../models/appointments")

module.exports = async (req, res) => {
    loggedIn = req.session.userId;
    loggedUserType = req.session.userType;
    let isDisplayError = false;
    res.render("appointment", {isDisplayError});
};