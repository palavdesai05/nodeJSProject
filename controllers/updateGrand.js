const User = require("../models/user");

module.exports = async ( req, res ) => {
    const { _id, examinerComment, passfail } = req.body
    let isError = false
    let errorMessage =  ""
    if(examinerComment && passfail){
        await User.findOneAndUpdate( { _id: _id }, {
            comment: examinerComment,
            testResult: passfail
        })
        User.find( { appointmentID: { $ne: null }, testResult: null })
        .populate( "appointmentID", { match: { isTimeSlotAvailable: false } })
        .exec( ( error, data ) => {
            if(data.length > 0 ) {
                res.render( "appointments", {
                    isError: isError,
                    errorMessage: errorMessage,
                    data: data,
                    filteredBy: "all",
                    id: _id
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
    }else {
        User.find( { appointmentID: { $ne: null }, testResult: null })
        .populate( "appointmentID", { match: { isTimeSlotAvailable: false } } )
        .exec( ( error, data ) => {
            if(data.length > 0 ) {
                res.render( "appointments", {
                    isError: true,
                    errorMessage: "Please enter all data.",
                    data: data,
                    filteredBy: "all",
                    id: _id
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
    }
}
