const Appointment = require( "../models/appointments" )

module.exports = async ( req, res ) => {
    let getAppointment = await Appointment.find({date: req.params.date})
    if(getAppointment) {
        res.status( 200 ).send( { getAppointment });
    }
}
