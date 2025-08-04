const express = require('express');
const router = express.Router();
const {addUser ,login, getUsers , submitContact , consultantProfile , myBooking ,cancelBooking , sendOTP , sendResetOtp , resetPassword } = require('../controllers/userController');

// router.post('/add' , addUser);
router.get('/', getUsers);
router.post("/send-otp", sendOTP);
router.post('/signup' , addUser);
router.post("/login", login);
router.post('/forgot-password/send-otp', sendResetOtp);
router.post('/forgot-password/reset', resetPassword);



router.post('/submit', submitContact);
router.get("/consultantProfile/:id" , consultantProfile)
router.get("/mybookings/:token" , myBooking)
router.put("/bookings/cancel/:id" , cancelBooking)



module.exports = router;