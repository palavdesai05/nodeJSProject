const Driver = require("../models/user");

module.exports = async (req, res) => {
    Driver.find( { appointmentID: { $ne: null }, testResult: null })
    .populate( "appointmentID", { match: { isTimeSlotAvailable: false } } )
    .exec( ( error, data ) => {
        if(data.length > 0 ) {
            res.render( "appointments", {
                isError: false,
                errorMessage: "",
                data: data,
                filteredBy: "all",
                id: null
            } )
        }else {
            res.render( "appointments", {
                isError: false,
                errorMessage: "",
                data: null,
                filteredBy: "",
                id: null
            } )
        }
    } )
};
