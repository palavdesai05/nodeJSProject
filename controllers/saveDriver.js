const Driver = require("../models/user");
const Appointment = require("../models/appointments");

module.exports = async (req, res, error) => {
  loggedIn = req.session.userId;
  loggedUserType = req.session.userType;

  const {firstname, lastname, age, license_no, appointmentType, make, model, year, platno, option1, slotdate } = req.body
  if(firstname && lastname && age && license_no && appointmentType && make && model && year && platno && option1 && slotdate){

    Appointment.findOne({ time: option1, date: slotdate })
    .then((data, error) => {
        if(res){
            Appointment.findOneAndUpdate(
                { _id: data._id },
                {
                    isTimeSlotAvailable: false
                }
            )
            .then((res,error) => {
              console.log(error);
            })
            Driver.findOneAndUpdate(
              { _id: req.session.userId },
              {$set:{
                ...req.body,
                appointmentID: data._id,
                car_details: {
                  make: make,
                  model: model,
                  year: year,
                  platno: platno,
                },
              }
              }
            ).then((resss, error) => {
              if (req.session.userId) {
                let isError = false;
                  Driver.findOne({ _id: req.session.userId }).populate("appointmentID")
                  .then((ress, error) => {
                      let driver = ress;
                      if(appointmentType == "G"){
                          res.render("g", {isError, driver});
                      }else {
                          res.render("g2", {isError, driver});
                      }
                  })
              } else {
                res.redirect("/");
              }
            })
        }
    })  
    
  }else {
    let isError = true;
    Driver.findOne({ _id: req.session.userId }).populate("appointmentID")
    .then((ress, error) => {
        let driver = ress;
        if(appointmentType == "G"){
            res.render("g", {isError, driver});
        }else {
            res.render("g2", {isError, driver});
        }
    })
  }
  
};
