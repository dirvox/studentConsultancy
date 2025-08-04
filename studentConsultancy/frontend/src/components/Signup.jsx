import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../assets/bgimg2.png';
import signupImage from '../assets/signupimag2.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
    if (!form.email) {
      return toast.error("Please enter your email first.");
    }
    try {
      await axios.post("/api/users/send-otp", { email: form.email });
      setOtpSent(true);
      toast.success("OTP sent to your email.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password, confirmPassword, otp } = form;

    if (!email || !password || !confirmPassword || !otp) {
      return toast.error("All fields are required.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
        otp
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Signup successful!");

      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div
      className="min-h-screen pt-8 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <motion.div
        className="bg-white shadow-lg rounded-xl flex w-full max-w-4xl overflow-hidden mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left Image */}
        <motion.div
          className="hidden md:block w-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img src={signupImage} alt="signup" className="h-full object-cover" />
        </motion.div>

        {/* Right Form */}
        <motion.div
          className="w-full md:w-1/2 p-8 sm:p-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-purple-600">Create an Account</h2>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📧</span>
            </div>

            <div className="flex justify-end">
  <button
    type="button"
    onClick={handleSendOTP}
    className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300 shadow-sm"
  >
    {otpSent ? "🔁 Resend OTP" : "📩 Get OTP"}
  </button>
</div>


            {/* OTP */}
            <div className="relative">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔢</span>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">✅</span>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? <a href="/login" className="text-purple-500 hover:underline">Login</a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
