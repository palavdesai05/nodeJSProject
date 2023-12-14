const User = require("../models/user");

module.exports = async (req, res) => {
    loggedIn = req.session.userId;
    loggedUserType = req.session.userType;
    User.find( { appointmentID: { $ne: null }, testResult: { $ne: null } })
    .populate( "appointmentID", { match: { isTimeSlotAvailable : false } } )
    .exec( ( error, data ) => {
        if(data.length > 0 ) {
            
            res.render( "result", {
                isError: false,
                errorMessage: "",
                data: data,
            })
        } else {
            res.render( "result", {
                isError: true,
                errorMessage: "No result found",
                data: null,
            })
        }

    } )
};