const User = require('../models/User');
const Contact = require('../models/Contact');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Consultant = require("../models/Consultant")
const Booking = require("../models/Booking");

// const User = require("../models/User");
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "devanshjinraniya41@gmail.com",
    pass: "mtonrhqeigxyrjto", // Use app password for Gmail
  },
});



exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(email, { otp, expiry });

  console.log("otp is ", otp  , email);

  try {
    await transporter.sendMail({
  from: '"Dirvox - Student Guide" <devanshjinraya41@gmail.com>',
  to: email,
  subject: "🔐 Your One-Time Password (OTP) from Dirvox",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
      <h2 style="color:rgb(226, 70, 229);">Welcome to <span style="color: #16a34a;">Dirvox</span> 🎓</h2>
      <p>Thank you for choosing <strong>Dirvox</strong>, your trusted student guide platform.</p>
      
      <p style="margin: 20px 0;">To complete your signup process, please use the following One-Time Password (OTP):</p>
      
      <div style="
        text-align: center;
        font-size: 36px;
        font-weight: bold;
        color:rgb(213, 70, 229);
        background-color: #eef2ff;
        padding: 20px;
        border-radius: 10px;
        letter-spacing: 6px;
        width: fit-content;
        margin: 0 auto 20px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      ">
        ${otp}
      </div>

      <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
      
      <p style="font-size: 14px; color: #666;">
        Need help? Contact us at <a href="mailto:support@dirvox.com">support@dirvox.com</a><br/>
        With gratitude,<br/>
        <strong>The Dirvox Team</strong>
      </p>
    </div>
  `
});


    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};


exports.sendResetOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 5 * 60 * 1000;
  otpStore.set(email, { otp, expiry });

  await transporter.sendMail({
    from: '"Dirvox Support" <yourcompany@gmail.com>',
    to: email,
    subject: '🔐 Dirvox Password Reset OTP',
    html: `
      <div style="font-family: Arial,sans-serif; padding:20px; background:#f9f9f9; color:#333;">
        <h2 style="color:#4f46e5;">Dirvox Password Reset</h2>
        <p>You're receiving this email because you requested a password reset.</p>
        <p style="margin:20px 0;">Use this OTP to reset your password:</p>
        <div style="
          text-align:center;
          font-size:36px;
          font-weight:bold;
          background:#eef2ff;
          color:#4f46e5;
          padding:20px;
          border-radius:10px;
          letter-spacing:6px;
          width:fit-content;
          margin:0 auto 20px;
          box-shadow:0 0 10px rgba(0,0,0,0.1);
        ">${otp}</div>
        <p>OTP is valid for <strong>5 minutes</strong>.</p>
        <hr style="margin:30px 0; border:none; border-top:1px solid #ddd;" />
        <p style="font-size:14px; color:#666;">
          If you didn’t request this, please ignore.<br/>
          Contact <a href="mailto:support@dirvox.com">support@dirvox.com</a> for help.<br/>
          With love,<br/>
          <strong>Dirvox Team</strong>
        </p>
      </div>
    `
  });

  res.json({ success: true, message: 'OTP sent to email.' });
};


// 👉 Verify OTP & reset password + auto login
exports.resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;
  const stored = otpStore.get(email);

  if (!stored || stored.otp !== otp || stored.expiry < Date.now()) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

  // Hash and update password
  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;

  // Generate token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  user.token = token;
  await user.save();

  otpStore.delete(email);

  res.json({
    success: true,
    message: 'Password reset successfully. You are now logged in.',
    token,
    user: {
      email: user.email,
      role: user.role,
      token: user.token,
    }
  });
};


// Now use JWT_SECRET wherever needed

exports.addUser = async (req, res) => {
  const { email, password, otp } = req.body;

  const stored = otpStore.get(email);
  if (!stored || stored.otp !== otp || stored.expiry < Date.now()) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, userStatus: 1 });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    user.token = token;
    await user.save();

    otpStore.delete(email); // remove OTP after success

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { email: user.email, token: user.token },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};


exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // console.log("req body ", req.body);

    let user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }]
    });

    let userType = 'User';

    if (!user) {
      user = await Consultant.findOne({
        $or: [{ email: identifier }, { phone: identifier }]
      });
      userType = 'Consultant';
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User or Consultant not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password." });
    }

    const token = jwt.sign({ id: user._id, type: userType }, JWT_SECRET);

    // Save token (optional - only if you store it in DB)
    user.token = token;
    await user.save();

    res.json({
      success: true,
      message: "Login Successfully",
      token,
      user,
      userType
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.submitContact = async (req, res) => {
    console.log("eq," , req.body);
    // console.log("Devansh")
    try {
      const contact = new Contact(req.body);
      await contact.save();
      res.status(201).json({ message: 'Contact saved successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  exports.consultantProfile = async (req, res) => {
    console.log("req.params.id:", req.params.id); // Corrected this line
  
    try {
      const consultant = await Consultant.findById(req.params.id);
  
      // console.log("Consultant:", consultant);
  
      if (!consultant) {
        return res.status(404).json({ message: "Consultant not found" });
      }
  
      res.json(consultant);
    } catch (error) {
      console.error("Error fetching consultant:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  exports.myBooking = async (req, res) => {
    // Corrected this line

    const token = req.params.token;
    // console.log("req.params.id:",token); 
    try {
      const user = await User.findOne({ token: token });
      const userId = user._id;
      const bookings = await Booking.find({ userId: userId });

      // console.log("booking" , bookings);

      return res.status(200).json(bookings)
      
    } catch (error) {
      console.error("Error fetching consultant:", error);
      res.status(500).json({ message: "Server error" });
    }
  };




exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  const { reason } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const consultant = await Consultant.findById(booking.consultantId);
    if (!consultant) {
      return res.status(404).json({ message: "Consultant not found" });
    }

    // Cancel booking
    booking.status = "cancelled";
    booking.cancelUserReason = reason;

    // Find and update the time slot
    const slotToUpdate = consultant.timeSlots.find(
      (slot) => slot._id.toString() === booking.timeSlotId.toString()
    );

    if (!slotToUpdate) {
      return res.status(404).json({ message: "Time slot not found in consultant's data" });
    }

    slotToUpdate.isBooked = false;

    // Save both documents (no transaction)
    await booking.save();
    await consultant.save();

    return res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return res.status(500).json({ message: "Server error. Booking not cancelled." });
  }
};
