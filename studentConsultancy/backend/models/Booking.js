// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  consultantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Consultant', 
    required: true 
  },
  consultantName : String,
  cancelUserReason : String,
  cancelConsulatntReason : String,
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  timeSlotId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  day: { type: String },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  notes: { type: String },
  meetingLink: { type: String },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);