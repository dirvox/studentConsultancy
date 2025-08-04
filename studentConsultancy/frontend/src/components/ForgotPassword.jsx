import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../assets/bgimg2.png';
import loginImage from '../assets/loginimg3.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) return toast.error('Please enter your email.');
    try {
      await axios.post('/api/users/forgot-password/send-otp', { email });
      toast.success('OTP sent to your email.');
      setStep(2);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to send OTP');
    }
  };
const resetPassword = async (e) => {
  e.preventDefault();
  if (!otp || !password) return toast.error('Fill all fields.');
  try {
    const res = await axios.post('/api/users/forgot-password/reset', {
      email, otp, password
    });

    toast.success(res.data.message);

    // ✅ Save to localStorage
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('role', res.data.user.role);

    // ✅ Redirect and reload
    navigate('/');
    setTimeout(() => window.location.reload(), 500);
  } catch (e) {
    toast.error(e.response?.data?.message || 'Reset failed');
  }
};


  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <motion.div
        className="bg-white shadow-lg rounded-xl flex w-full max-w-4xl overflow-hidden mt-10"
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Left Form */}
        <motion.div
          className="w-full md:w-1/2 p-8 sm:p-10"
          initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
        >
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-center text-purple-600">Forgot Password</h2>
              <div className="mt-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={sendOtp}
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                >
                  Send OTP
                </button>
              </div>
              <p className="mt-4 text-center text-sm text-gray-600">
                Remembered password?{' '}
                <a href="/login" className="text-purple-500 hover:underline">Login</a>
              </p>
            </>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={resetPassword}>
              <h2 className="text-2xl font-bold text-center text-purple-600">Reset Your Password</h2>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-300"
              >
                Reset Password
              </button>
            </form>
          )}
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="hidden md:block w-1/2"
          initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}
        >
          <img src={loginImage} alt="forgot password" className="h-full object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
