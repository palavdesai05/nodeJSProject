const User = require("../models/user");

module.exports = (req, res, next) => {
    loggedIn = req.session.userId;
    loggedUserType = req.session.userType;
    if( !req.session.userId ) {
        return res.redirect( "/login" )
    }
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
        return res.redirect("/");
        }
        if( user.userType !== 'Admin' ) {
        return res.redirect( "/" )
        }
        next();
    });
};
