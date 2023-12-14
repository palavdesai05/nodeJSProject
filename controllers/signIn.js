const User = require("../models/user");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
    let validation = {
        passwordErr: false,
        passInValid: true,
    };
  const findUser = await User.findOne({ username: req.body.username });
  if (!findUser || !bcrypt.compareSync(req.body.password, findUser.password)) {
    res.render("login", { validation });
  } else {
    req.session.userId = findUser._id;
    loggedIn = req.session.userId;
    req.session.userType = findUser.userType;
    loggedUserType = req.session.userType;
    res.render("dashboard");
  }
};
