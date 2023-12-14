const mongoose = require( "mongoose" )

let AppointmentSchema = new mongoose.Schema( {
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  isTimeSlotAvailable: {
    type: Boolean
  }
})
module.exports = mongoose.model('appointment', AppointmentSchema);