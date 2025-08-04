import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../assets/bgimg2.png';
import loginImage from '../assets/loginimg3.png';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
  const [identifier, setIdentifier] = useState(''); // email or phone
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', {
        identifier,
        password,
      });

      console.log("refernce is ", res)
      localStorage.setItem('token', res.data?.token);
      localStorage.setItem('user', JSON.stringify(res.data?.user));
      localStorage.setItem('role', res.data?.user?.role);
      localStorage.setItem('phone', res.data?.user?.phone);

      if(res.data.success){
        toast.success(res.data?.message);
      }

      navigate('/');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <motion.div
        className="bg-white shadow-lg rounded-xl flex w-full max-w-4xl overflow-hidden mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Right Side Form */}
        <motion.div
          className="w-full md:w-1/2 p-8 sm:p-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form
            className="space-y-6 bg-white p-8 rounded-xl shadow-xl max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-center text-purple-600">
              Welcome Back
            </h2>

            {/* Identifier Field (Email or Phone) */}
            <div className="relative">
              <input
                type="text"
                placeholder="Email or Phone"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📱</span>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? '🙈' : '👁️'}
              </span>
            </div>

            {/* Forgot Password */}
            <div onClick={() => navigate('/forgot-password')}
                       className="text-right text-sm text-purple-500 hover:underline cursor-pointer">
              Forgot password?
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{' '}
            <a href="/signup" className="text-purple-500 hover:underline">
              Signup
            </a>
          </p>
        </motion.div>

        {/* Left Side Image */}
        <motion.div
          className="hidden md:block w-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img src={loginImage} alt="login" className="h-full object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
