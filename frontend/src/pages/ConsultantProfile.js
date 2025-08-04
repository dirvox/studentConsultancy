import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from 'axios';
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";
import MyBooking from "./MyBooking";

// Animation variants
const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
};

const cardAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + (i * 0.1),
      duration: 0.5,
    },
  }),
};

const ConsultantProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlotId, setSelectedSlotId] = useState(null);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/consultantProfile/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const renderAnimatedText = (text) => {
    if (!text) return null;
    return text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        custom={i}
        initial="hidden"
        animate="visible"
        variants={wordAnimation}
        className="d-inline-block me-1"
      >
        {word}
      </motion.span>
    ));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh", marginTop: "8rem" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="alert alert-danger" role="alert">
          Profile information could not be loaded. Please try again later.
        </div>
      </div>
    );
  }

  const handleBooking = async () => {
  if (!selectedSlotId) {
    alert("Please select a time slot.");
    return;
  }

  const token = localStorage.getItem("token")

  try {
    const res = await axios.post('/api/admin/bookConsulatnt', {
      consultantId: id,// Replace with real user ID (maybe from context/auth)
      slotId: selectedSlotId,
      token : token
    });

    console.log("response is ", res);

    toast.success("Booking successful!");

          navigate("/myBookingUser")
  } catch (err) {
    console.error("Booking failed", err);
    toast.error("Failed to book the consultant.");
  }
};


  return (
    <div className="container-fluid py-5" style={{ marginTop: "6rem", background: "linear-gradient(135deg, #f5f7fa 0%,rgb(255, 255, 255) 100%)" }}>
      <motion.div
        className="container py-4 px-4 rounded-4 shadow-lg bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="row g-4">
          {/* Left Column - Profile Info */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                <div className="position-relative mb-4 mx-auto" style={{ width: "180px", height: "180px" }}>
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${data.image}`}
                    alt={data.name}
                    className="rounded-circle img-fluid border border-4 border-light shadow"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div className="position-absolute bottom-0 end-0">
                    <span className="badge rounded-pill bg-success p-2">
                      <i className="bi bi-check-circle-fill me-1"></i>Verified
                    </span>
                  </div>
                </div>

                <h2 className="fw-bold text-primary mb-2">{data.name}</h2>
                <p className="text-muted fs-5 mb-3">{data.role}</p>

                <hr className="my-4" />

                <div className="d-flex justify-content-around text-center mb-3">
                  <div>
                    <i className="bi bi-star-fill text-warning"></i>
                    <p className="mb-0 small">Rating: {data.rating}</p>
                  </div>
                  <div>
                    <i className="bi bi-clock-history text-info"></i>
                    <p className="mb-0 small">{data.experience}+ years Experience</p>
                  </div>
                  <div>
                    <i className="bi bi-people-fill text-success"></i>
                    <p className="mb-0 small">100+ Clients</p>
                  </div>
                </div>

                <div className="list-group list-group-flush text-start">
                  <div className="list-group-item bg-transparent px-0">
                    <strong><i className="bi bi-calendar-date me-2 text-primary"></i>Age:</strong>
                    <span className="float-end text-muted">{data.age}</span>
                  </div>
                  <div className="list-group-item bg-transparent px-0">
                    <strong><i className="bi bi-mortarboard-fill me-2 text-primary"></i>Education:</strong>
                    <span className="float-end text-muted">{data.education}</span>
                  </div>
                  <div className="list-group-item bg-transparent px-0">
                    <strong><i className="bi bi-geo-alt-fill me-2 text-primary"></i>Location:</strong>
                    <span className="float-end text-muted">{data.location}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="btn btn-primary rounded-pill w-100 py-2 mb-2"
                    disabled={!selectedSlotId}
                    onClick={handleBooking}>
                    <i className="bi bi-calendar-plus me-2"></i>Book Consultation
                  </button>
                  <button className="btn btn-outline-primary rounded-pill w-100 py-2">
                    <i className="bi bi-chat-dots me-2"></i>Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="col-lg-8">
            <div className="row g-4">
              {/* Bio Section */}
              <div className="col-md-6 mb-4">
                <motion.div
                  className="card h-100 border-0 shadow-sm"
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  variants={cardAnimation}
                >
                  <div className="card-header bg-black bg-opacity-10 border-0">
                    <h5 className="mb-0 py-2">
                      <i className="bi bi-person-lines-fill me-2 text-primary"></i>
                      <span className="fw-bold">Bio</span>
                    </h5>
                  </div>
                  <div className="card-body">
                    <p>{data.bio}</p>
                  </div>
                </motion.div>
              </div>

              {/* Goals Section */}
              <div className="col-md-6 mb-4">
                <motion.div
                  className="card h-100 border-0 shadow-sm"
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  variants={cardAnimation}
                >
                  <div className="card-header bg-success bg-opacity-10 border-0">
                    <h5 className="mb-0 py-2">
                      <i className="bi bi-bullseye me-2 text-success"></i>
                      <span className="fw-bold">Goals</span>
                    </h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {data.goals.map((goal, idx) => (
                        <li key={idx} className="list-group-item">{goal}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Concerns Section */}
              <div className="col-md-6 mb-4">
                <motion.div
                  className="card h-100 border-0 shadow-sm"
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  variants={cardAnimation}
                >
                  <div className="card-header bg-danger bg-opacity-10 border-0">
                    <h5 className="mb-0 py-2">
                      <i className="bi bi-shield-fill-exclamation me-2 text-danger"></i>
                      <span className="fw-bold">Concerns</span>
                    </h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {data.concerns.map((concern, idx) => (
                        <li key={idx} className="list-group-item">{concern}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Motivations Section */}
              <div className="col-md-6 mb-4">
                <motion.div
                  className="card h-100 border-0 shadow-sm"
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  variants={cardAnimation}
                >
                  <div className="card-header bg-warning bg-opacity-10 border-0">
                    <h5 className="mb-0 py-2">
                      <i className="bi bi-lightning-charge-fill me-2 text-warning"></i>
                      <span className="fw-bold">Motivations</span>
                    </h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {data.motivations.map((motivation, idx) => (
                        <li key={idx} className="list-group-item">{motivation}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Skills Section */}
              <div className="col-md-6 mb-4">
                <motion.div
                  className="card h-100 border-0 shadow-sm"
                  initial="hidden"
                  animate="visible"
                  custom={4}
                  variants={cardAnimation}
                >
                  <div className="card-header bg-info bg-opacity-10 border-0">
                    <h5 className="mb-0 py-2">
                      <i className="bi bi-gear-fill me-2 text-info"></i>
                      <span className="fw-bold">Skills</span>
                    </h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {data.skills.map((skill, idx) => (
                        <li key={idx} className="list-group-item">{skill}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Time Slot Section */}
            {data.timeSlots.length > 0 && (
  <motion.div
    className="card border-0 shadow-sm mt-4"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7, duration: 0.5 }}
  >
    <div className="card-header bg-light border-0">
      <h5 className="mb-0 py-2">
        <i className="bi bi-calendar-check me-2 text-success"></i>
        <span className="fw-bold">Available Time Slots</span>
      </h5>
    </div>
    <div className="card-body">
      <div className="row g-2">
        {data.timeSlots
          .filter((slot) => {
            const slotDate = new Date(slot.date);
            const today = new Date();
            slotDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            return slotDate >= today;
          })
          .map((slot, index) => {
            const slotId = slot._id;
            return (
              <div key={index} className="col-md-4 col-6">
                <div
                  className={`badge w-100 p-2 text-start cursor-pointer ${
                    slot.isBooked
                      ? 'bg-secondary text-light'
                      : selectedSlotId === slotId
                      ? 'bg-primary text-white'
                      : 'bg-success text-white'
                  }`}
                  style={{ cursor: slot.isBooked ? 'not-allowed' : 'pointer' }}
                  onClick={() => !slot.isBooked && setSelectedSlotId(slotId)}
                >
                  <i className="bi bi-clock me-2"></i>
                  <span>
                    {new Date(slot.date).toLocaleDateString()} | {slot.startTime} - {slot.endTime}
                  </span>
                  {slot.isBooked && <span className="ms-2">(Booked)</span>}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  </motion.div>
)}

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultantProfile;
