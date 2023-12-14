const Driver = require('../models/user');
const Appointment = require("../models/appointments");

const dashboard = (req,res) => {
    res.render("dashboard");
}
 
const gTest = async (req, res) => {
  const driver = await Driver.findOne({ _id: req.session.userId }).populate("appointmentID")
  let isError = false;
  res.render("g", {driver, isError});
}
 
const g2Test = async (req,res) => {
  const driver = await Driver.findOne({ _id: req.session.userId }).populate("appointmentID")
  let isError = false;
    res.render("g2", {driver, isError });
}

const login = (req,res) => {
  let validation = {
    passwordErr: false,
    passInValid: false,
  };
    res.render("login", {validation});
}
const register = (req,res) => {
  let validation = {
    passwordErr: false,
    passInValid: false,
  };
    res.render("register", {validation});
}

module.exports = {dashboard, gTest, g2Test, login, register}