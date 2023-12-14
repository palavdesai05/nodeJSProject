const express = require('express');
const router = express.Router();
const {dashboard, gTest, g2Test, login, register} = require('../controllers/controllers');
const signUp = require('../controllers/signUp');
const signIn = require('../controllers/signIn');
const updateDriver = require('../controllers/updateDriver');
const saveDriver = require('../controllers/saveDriver');
const redirectionAuth = require('../middleware/redirectionAuth');
const logout = require('../controllers/logout');
const appointment = require('../controllers/appointment');
const adminAppointment = require('../controllers/adminAppointment');
const getAppointment = require('../controllers/getAppointment');
const examinerAppointment = require('../controllers/examinerAppointment');
const filterAppointmentData = require('../controllers/filterAppointmentData');
const updateGrand = require('../controllers/updateGrand');
const result = require('../controllers/result');

const driverAuthMiddleware = require("../middleware/driverAuthMiddleware");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const examinerAuthMiddleware = require("../middleware/examinerAuthMiddleware");

router.get('/',dashboard);

router.get('/login', login);
router.get('/register', register);

router.get('/g-test', driverAuthMiddleware, gTest);
router.get('/g2-test', driverAuthMiddleware, g2Test);

router.post('/save-driver',driverAuthMiddleware, saveDriver);
router.post('/update-driver', driverAuthMiddleware, updateDriver);

router.post('/sign-up', redirectionAuth, signUp);
router.post('/sign-in', redirectionAuth, signIn);

router.get('/logout', logout);

router.get('/admin-appointment', adminAuthMiddleware, appointment);
router.post('/admin-add-appointment', adminAuthMiddleware, adminAppointment);
router.get("/get-appointment/:date", getAppointment);
router.get("/display-result",adminAuthMiddleware, result);

router.get("/examiner-appointment", examinerAuthMiddleware, examinerAppointment);
router.get("/examiner-appointment/:type", examinerAuthMiddleware, filterAppointmentData);
router.post("/update-grad", examinerAuthMiddleware, updateGrand);

module.exports =router;