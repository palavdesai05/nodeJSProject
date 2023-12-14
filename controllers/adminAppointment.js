const Appointment = require( "../models/appointments" )

module.exports = async ( req, res ) => {
  if(req.body.date && req.body.option1){
   Appointment.findOne({ time: req.body.option1, date: req.body.date })
   .then((ress, err) => {
    
    if(!ress) {
      console.log(ress, "ress");
      Appointment.create({
        time: req.body.option1,
        date: req.body.date,
        isTimeSlotAvailable: true,
      })
      .then((data, err) => {
        console.log("sdfsdf");
        let isDisplayError = false;
        res.render("appointment", {isDisplayError});
      })
    }else if(res) {
      let isDisplayError = true;
      res.render("appointment", {isDisplayError});
    }
   })
  } 
}