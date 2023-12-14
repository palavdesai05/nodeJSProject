const Driver = require('../models/user');

module.exports = async (req, res, error) => {
  loggedIn = req.session.userId;
  loggedUserType = req.session.userType;

  Driver.find({
    _id: req.session.userId,
  })
  .then((driver,error) => {
    Driver.findOneAndUpdate(
      { _id: req.session.userId },
      {
        firstname: req.body.firstname ? req.body.firstname : driver[0].firstname,
        lastname: req.body.lastname ? req.body.lastname : driver[0].lastname,
        age: req.body.age ? req.body.age : driver[0].age,
        sin: req.body.sin ? req.body.sin : driver[0].sin,
        car_details: {
          make: req.body.make ? req.body.make : driver[0].car_details.make,
          model: req.body.model ? req.body.model : driver[0].car_details.model,
          year: req.body.year ? req.body.year : driver[0].car_details.year,
          platno: req.body.platno ? req.body.platno : driver[0].car_details.platno,
        },
      }
    )
    .then((ress, error) => {
      if (req.session.userId) {
        let isError = false;
          Driver.findOne({ _id: req.session.userId }).populate("appointmentID")
          .then((ress, error) => {
              let driver = ress;
              if(req.body.appointmentType == "G"){
                  res.render("g", {isError, driver});
              }else {
                  res.render("g2", {isError, driver});
              }
          })
      } else {
        res.redirect("/");
      }
    })
    
 
  })
    
};
