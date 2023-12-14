const User = require("../models/user");

module.exports = async (req, res, error) => {
  let validation = {
    passwordErr: false,
    passInValid: false,
  };
  if (req.body.password == req.body.confirmPassword) {
    await User.create({
      username: req.body.username,
      password: req.body.password,
      userType: req.body.userType,
    });
  } else {
    validation.passwordErr = true;
  }
  res.render("login", { validation });
};
