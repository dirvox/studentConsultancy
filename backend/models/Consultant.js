const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

const consultantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  expertise: { type: String, required: true },
  password : { type: String, required: true },
  confirmPassword : { type: String, required: true },
  token : { type: String },
  role: { type: String, default: 'consultant' },
  about: { type: String, required: true },
  bio: [String],
  goals: [String],
  motivations: [String],
  concerns: [String],
  education: { type: String },
  location: { type: String },
  age: { type: Number },
  experience: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, default: 5 },
  clientsCount: { type: Number, default: 0 },
  skills: [String],
 
  timeSlots: [timeSlotSchema],
  sessionDuration: { type: Number, default: 45 },
}, { timestamps: true });

module.exports = mongoose.model('Consultant', consultantSchema);
