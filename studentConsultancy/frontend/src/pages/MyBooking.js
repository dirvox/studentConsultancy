import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CalendarDays, Clock10, UserCheck } from "lucide-react";
import { toast } from "react-toastify";

const CancelReasons = [
  "Change in plans",
  "Found a better time",
  "Consultant not suitable",
  "Booked by mistake",
  "Session not required anymore",
  "Rescheduling",
  "Emergency",
  "Too expensive",
  "Health reasons",
  "Other",
];

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/users/mybookings/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      if (data && Array.isArray(data)) setBookings(data);
      else setBookings([]);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openCancelModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setSelectedReason("");
    setCustomReason("");
    setShowModal(true);
  };

  const submitCancellation = async () => {
    if (!selectedReason) {
      toast.error("Please select a reason.");
      return;
    }

    const reasonToSend = selectedReason === "Other" ? customReason.trim() : selectedReason;

    if (selectedReason === "Other" && !reasonToSend) {
      toast.error("Please enter a reason.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/users/bookings/cancel/${selectedBookingId}`,
        { reason: reasonToSend },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Booking cancelled successfully!");
      setShowModal(false);
      fetchBookings();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div style={{ marginTop: "6rem" }} className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#8E4AAA] drop-shadow-sm">
        My Bookings
      </h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking, i) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 relative"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#8E4AAA]">
                  {booking.consultantName}
                </h3>
                <UserCheck className="text-[#8E4AAA]" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <CalendarDays className="w-5 h-5 text-[#8E4AAA]" />
                  <span>
                    <strong>Date:</strong>{" "}
                    {new Date(booking.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Clock10 className="w-5 h-5 text-[#8E4AAA]" />
                  <span>
                    <strong>Time:</strong> {booking.startTime} - {booking.endTime}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-xs font-semibold text-white shadow-md ${
                      booking.status === "active"
                        ? "bg-green-500"
                        : booking.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>

                 {booking.status !== "completed" && booking.status !== "cancelled" && (
  <button
    onClick={() => openCancelModal(booking._id)}
    className="ml-2 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-sm"
  >
    Cancel
  </button>
)}

                </div>
              </div>

              <div className="absolute top-0 right-0 w-4 h-4 bg-[#8E4AAA] rounded-bl-xl"></div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Cancel Modal */}
     {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40 backdrop-blur-sm px-4">
    <div className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl transition-all duration-300 ease-in-out">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#8E4AAA] mb-4 text-center">
        Cancel Booking
      </h2>
      <p className="text-gray-700 text-sm sm:text-base mb-4 text-center">
        Why are you cancelling this booking?
      </p>

      <div className="max-h-60 overflow-y-auto space-y-2 pr-2 ">
        {CancelReasons.map((reason) => (
          <label
            key={reason}
            className={`flex items-start gap-2 px-3 py-2 border rounded-lg cursor-pointer text-sm sm:text-base ${
              selectedReason === reason
                ? "border-[#8E4AAA] bg-[#f9f0ff]"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              value={reason}
              checked={selectedReason === reason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="mt-1"
            />
            <span className="flex-1">{reason}</span>
          </label>
        ))}
      </div>

      {selectedReason === "Other" && (
        <input
          type="text"
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
          className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E4AAA]"
          placeholder="Enter your reason"
        />
      )}

      <div className="flex justify-end mt-6 gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm sm:text-base transition"
        >
          Cancel
        </button>
        <button
          onClick={submitCancellation}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm sm:text-base transition"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MyBooking;
