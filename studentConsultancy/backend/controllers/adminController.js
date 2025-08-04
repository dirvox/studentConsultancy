
const Consultant = require('../models/Consultant');
const Booking = require('../models/Booking');
// const Users = require('../models/Users');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');


exports.addConsultant = async (req, res) => {
  try {
    const {
      name, email, phone, expertise,password , confirmPassword, about, experience,
      education, location, age, sessionDuration, role
    } = req.body;

       const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
          return res.status(400).json({ success : false , message: "User already exists." });
        }

        const existingUser2 = await Consultant.findOne({ $or: [{ email }, { phone }] });
        if (existingUser2) {
          return res.status(400).json({ success : false , message: "User already exists." });
        }

    if(password !== confirmPassword) {
      return res.status(400).json({ success : false, message : "Passwords do not match" });
    }


    


    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const parseArray = (field) => {
      if (!req.body[field]) return [];
      try {
        return JSON.parse(req.body[field]);
      } catch {
        return req.body[field].split(',').map(item => item.trim());
      }
    };

    const timeSlots = req.body.timeSlots
      ? JSON.parse(req.body.timeSlots).map(slot => ({
          date: new Date(slot.date),
          startTime: slot.startTime,
          endTime: slot.endTime,
          isBooked: false
        }))
      : [];

    const hashedPassword = await bcrypt.hash(password, 10);

    const consultant = new Consultant({
      name,
      email,
      phone,
      expertise,
      password : hashedPassword,
      confirmPassword,
      about,
      experience,
      image,
      education: education || '',
      location: location || '',
      age: age || null,
      bio: parseArray('bio'),
      goals: parseArray('goals'),
      motivations: parseArray('motivations'),
      concerns: parseArray('concerns'),
      skills: parseArray('skills'),
      role: role || 'Consultant',
      sessionDuration: Number(sessionDuration) || 45,
      timeSlots
    });

    await consultant.save();
    return res.status(201).json({ message: 'Consultant created successfully', consultant });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to create consultant' });
  }
};


exports.getConsultants = async (req, res) => {
  try {
    const consultants = await Consultant.find().sort({ createdAt: -1 });
    return res.status(200).json({ consultants });
  } catch (err) {
    console.error('Error fetching consultants:', err);
    return res.status(500).json({ message: 'Failed to fetch consultants' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    
    return res.status(200).json({ users });
  } catch (err) {
    console.error('Error fetching consultants:', err);
    return res.status(500).json({ message: 'Failed to fetch consultants' });
  }
};

exports.getConsultantProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const consultant = await Consultant.findById(id);
    
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }
    
    return res.status(200).json(consultant);
  } catch (err) {
    console.error('Error fetching consultant profile:', err);
    return res.status(500).json({ message: 'Failed to fetch consultant profile' });
  }
};

exports.addTimeSlots = async (req, res) => {
  const { date, slots } = req.body;
  const consultantPhone = req.params.id; // you're using phone as identifier

  try {
    console.log("Received data ->", { date, slots, consultantPhone });

    // Find consultant by phone
    const consultant = await Consultant.findOne({ phone: consultantPhone });
    if (!consultant) {
      return res.status(404).json({ success: false, message: "Consultant not found" });
    }

    // Remove existing slots for the given date
    consultant.timeSlots = consultant.timeSlots.filter(slot =>
      new Date(slot.date).toDateString() !== new Date(date).toDateString()
    );

    // Add new slots for that date
    slots.forEach(({ startTime, endTime }) => {
      consultant.timeSlots.push({ date, startTime, endTime, isBooked: false });
    });

    await consultant.save();

    res.json({
      success: true,
      message: "Slots updated successfully",
      timeSlots: consultant.timeSlots
    });
  } catch (err) {
    console.error("Error adding time slots:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const { id } = req.params;
    
    const consultant = await Consultant.findById(id);
    
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }
    
    // Filter only available time slots
    const availableTimeSlots = consultant.timeSlots.filter(slot => !slot.isBooked);
    
    return res.status(200).json({
      timeSlots: availableTimeSlots,
      sessionDuration: consultant.sessionDuration
    });
  } catch (err) {
    console.error('Error fetching available time slots:', err);
    return res.status(500).json({ message: 'Failed to fetch available time slots' });
  }
};

exports.updateConsultant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    
    const consultant = await Consultant.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }
    
    return res.status(200).json({
      message: 'Consultant updated successfully',
      consultant
    });
  } catch (err) {
    console.error('Error updating consultant:', err);
    return res.status(500).json({ message: 'Failed to update consultant' });
  }
};


// exports.getConsultants = async (req, res) => {
//     try {
//       const consultants = await Consultant.find().sort({ createdAt: -1 });
//       return res.status(200).json({ consultants });
//     } catch (err) {
//       console.error('Error fetching consultants:', err);
//       return res.status(500).json({ message: 'Failed to fetch consultants' });
//     }
//   };

exports.createBooking = async (req, res) => {
  try {
    const { consultantId, timeSlotId, date, notes } = req.body;
    const userId = req.user._id; // Assuming user info is available from auth middleware
    
    // Find the consultant and the time slot
    const consultant = await Consultant.findById(consultantId);
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }
    
    // Find the specific time slot
    const timeSlot = consultant.timeSlots.id(timeSlotId);
    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }
    
    // Check if the time slot is already booked
    if (timeSlot.isBooked) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }
    
    // Create the booking
    const booking = new Booking({
      consultantId,
      userId,
      timeSlotId,
      day: timeSlot.day,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      date,
      notes
    });
    
    // Mark the time slot as booked
    timeSlot.isBooked = true;
    
    // Save both the booking and updated consultant
    await Promise.all([
      booking.save(),
      consultant.save()
    ]);
    
    return res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    return res.status(500).json({ message: 'Failed to create booking' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id; // From auth middleware
    
    const bookings = await Booking.find({ userId })
      .populate('consultantId', 'name email image expertise')
      .sort({ date: 1 });
    
    return res.status(200).json({ bookings });
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    return res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

exports.getConsultantBookings = async (req, res) => {
  try {
    const { consultantId } = req.params;
    
    const bookings = await Booking.find({ consultantId })
      .populate('userId', 'name email')
      .sort({ date: 1 });
    
    return res.status(200).json({ bookings });
  } catch (err) {
    console.error('Error fetching consultant bookings:', err);
    return res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, meetingLink } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      id,
      { 
        $set: { 
          status,
          ...(meetingLink && { meetingLink })
        } 
      },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // If the booking is cancelled, free up the time slot
    if (status === 'cancelled') {
      const consultant = await Consultant.findById(booking.consultantId);
      const timeSlot = consultant.timeSlots.id(booking.timeSlotId);
      if (timeSlot) {
        timeSlot.isBooked = false;
        await consultant.save();
      }
    }
    
    return res.status(200).json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (err) {
    console.error('Error updating booking status:', err);
    return res.status(500).json({ message: 'Failed to update booking status' });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Free up the time slot
    const consultant = await Consultant.findById(booking.consultantId);
    const timeSlot = consultant.timeSlots.id(booking.timeSlotId);
    if (timeSlot) {
      timeSlot.isBooked = false;
      await consultant.save();
    }
    
    // Delete the booking
    await Booking.findByIdAndDelete(id);
    
    return res.status(200).json({
      message: 'Booking deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting booking:', err);
    return res.status(500).json({ message: 'Failed to delete booking' });
  }
};



exports.bookConsultant = async (req, res) => {
  const data = req.body;

  console.log("booked consultant data", data);
  const user = await User.findOne({ token: data.token });

  console.log("user:", user);

  if (!user) {
    return res.status(200).json({ success: false, message: "Login Required" });
  }

  if (user.role !== "user") {
    return res.status(200).json({ success: false, message: "Consultant cannot book a consultant" });
  }

  try {
    const { consultantId, slotId } = data;

    if (!consultantId || !slotId) {
      return res.status(200).json({ success: false, message: "Incomplete booking data" });
    }

    // Find consultant
    const consultant = await Consultant.findById(consultantId);
    if (!consultant) {
      return res.status(404).json({ success: false, message: "Consultant not found" });
    }
// Find the slot by _id
    const slot = consultant.timeSlots.id(slotId);

    if (!slot) {
      return res.status(404).json({ success: false, message: "Time slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ success: false, message: "Slot already booked" });
    }

    // Mark slot as booked
    slot.isBooked = true;
    await consultant.save();

    // Create a booking
    const booking = new Booking({
      consultantId,
      consultantName : consultant.name,
      timeSlotId : slotId,
      userId: user._id,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });

    await booking.save();

    return res.status(200).json({ success: true, message: "Booking successful", booking });


  

  } catch (err) {
    console.error("Error booking:", err);
    return res.status(500).json({ success: false, message: "Failed to book" });
  }
};



// {"_id":"6817a6a59ca491990de3e2ae","name":"Harsh kumar","email":"harsh5454dd@gmail.com","phone":"1458786523","expertise":"Marketing","password":"$2b$10$nhrBXwPlrK9A1Fl/LCzhsON4pjGvPu6c1JefLvWx7SyBXqcoPO0Ke","confirmPassword":"123456","role":"consultant","about":"dhbjhbuhkuj","bio":["hgyfcgvhijohgvchjok"],"goals":["jhvoiphgvjioj"],"motivations":["hvjipokiojhvjijo"],"concerns":["uvhipoughvjuio"],"education":"MBA","location":"khatauli , muzaffarnagar , Uttar Pardesh","age":21,"experience":"8","image":"/uploads/1746380453096.png","rating":5,"clientsCount":0,"skills":["vhbjipoihgvjijopjih"],"timeSlots":[{"date":"2025-05-05T00:00:00.000Z","startTime":"23:38","endTime":"00:23","isBooked":true,"_id":"6817b89f63fa1336d5ac893c"},{"date":"2025-05-05T00:00:00.000Z","startTime":"00:24","endTime":"01:09","isBooked":true,"_id":"6817b89f63fa1336d5ac893d"},{"date":"2025-05-06T00:00:00.000Z","startTime":"00:31","endTime":"01:16","isBooked":false,"_id":"6817b98163fa1336d5ac8966"},{"date":"2025-05-06T00:00:00.000Z","startTime":"01:31","endTime":"02:16","isBooked":false,"_id":"6817b98163fa1336d5ac8967"},{"date":"2025-05-06T00:00:00.000Z","startTime":"02:31","endTime":"03:16","isBooked":false,"_id":"6817b98163fa1336d5ac8968"},{"date":"2025-05-25T00:00:00.000Z","startTime":"15:00","endTime":"15:45","isBooked":false,"_id":"68329d0718bb2bc6b70911a1"}],"sessionDuration":45,"createdAt":"2025-05-04T17:40:53.247Z","updatedAt":"2025-05-25T07:32:11.662Z","__v":3,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTdhNmE1OWNhNDkxOTkwZGUzZTJhZSIsInR5cGUiOiJDb25zdWx0YW50IiwiaWF0IjoxNzQ4MTU4MzMxfQ.PvHXjtWvFFB1thxPsek-5MLrXbOzLZJhEUZHQvr5OPI"}