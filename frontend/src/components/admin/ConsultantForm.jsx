import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ConsultantForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    password:'',
    confirmPassword:'',
    about: '',
    bio: [''],
    goals: [''],
    motivations: [''],
    concerns: [''],
    education: '',
    location: '',
    age: '',
    experience: '',
    image: null,
    skills: [''],
    timeSlots: [],
    sessionDuration: 45,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const val = type === 'file' ? files[0] : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleArrayChange = (e, key, index) => {
    const newArray = [...formData[key]];
    newArray[index] = e.target.value;
    setFormData(prev => ({ ...prev, [key]: newArray }));
  };

  const addArrayItem = (key) => {
    setFormData(prev => ({ ...prev, [key]: [...prev[key], ''] }));
  };

  const handleTimeSlotChange = (index, field, value) => {
    const newSlots = [...formData.timeSlots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setFormData(prev => ({ ...prev, timeSlots: newSlots }));
  };

  const addTimeSlot = () => {
    setFormData(prev => ({
      ...prev,
      timeSlots: [...prev.timeSlots, { date: '', startTime: '', endTime: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          payload.append(key, JSON.stringify(value));
        } else if (key === 'image') {
          payload.append(key, value);
        } else {
          payload.append(key, value);
        }
      });

      // We'll use fetch instead of axios
      const response = await fetch('/api/admin/addConsultant', {
        method: 'POST',
        body: payload,
      });

      if (response.ok) {
        // alert('Consultant created successfully!');
        toast.success("Consultant Create Successfully");
        window.location.reload();
      } else {
        // alert('Error creating consultant');
        toast.error("Error Creating Consultant");
      }
    } catch (err) {
      console.error(err);
      // alert('Error creating consultant');
      toast.error("Error Creating Consultant");

    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const arrayItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 }
  };

  const addButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, color: "#3b82f6" },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="bg-gray-50 min-h-screen py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
          {/* Header */}
          <motion.div 
            className="bg-primary px-6 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              className="text-2xl font-bold text-white"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              Create Consultant Profile
            </motion.h2>
            <motion.p 
              className="text-black-100 mt-1"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Fill in the details to create a new consultant profile
            </motion.p>
          </motion.div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Personal Information Section */}
              <motion.section variants={sectionVariants}>
                <motion.h3 
                  className="text-lg font-medium text-gray-900 border-b pb-2 mb-4"
                  variants={itemVariants}
                >
                  Personal Information
                </motion.h3>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={itemVariants}
                >
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="tel"
                      id="phone"
                      name="phone"
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </motion.div>
                 
                  <motion.div variants={itemVariants}>
                    <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">
                      Area of Expertise <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="text"
                      id="expertise"
                      name="expertise"
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="text"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="text"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </motion.div>
                  
                </motion.div>
              </motion.section>

              {/* About Section */}
              <motion.section variants={sectionVariants}>
                <motion.h3 
                  className="text-lg font-medium text-gray-900 border-b pb-2 mb-4"
                  variants={itemVariants}
                >
                  About
                </motion.h3>
                <motion.div variants={itemVariants}>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Description <span className="text-red-500">*</span>
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                    id="about"
                    name="about"
                    rows={4}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write a brief description about the consultant..."
                  />
                </motion.div>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                  variants={itemVariants}
                >
                  <motion.div variants={itemVariants}>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                      Education
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="text"
                      id="education"
                      name="education"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="text"
                      id="location"
                      name="location"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="number"
                      id="age"
                      name="age"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="text"
                      id="experience"
                      name="experience"
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </motion.div>
                </motion.div>
              </motion.section>

              {/* Profile Details Section */}
              <motion.section variants={sectionVariants}>
                <motion.h3 
                  className="text-lg font-medium text-gray-900 border-b pb-2 mb-4"
                  variants={itemVariants}
                >
                  Profile Details
                </motion.h3>
                
                {/* Bio Array */}
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biography Points
                  </label>
                  <motion.div 
                    className="space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {formData.bio.map((item, index) => (
                      <motion.input
                        key={index}
                        variants={arrayItemVariants}
                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                        initial="hidden"
                        animate="visible"
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(e, 'bio', index)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter biography point..."
                      />
                    ))}
                  </motion.div>
                  <motion.button
                    variants={addButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
                    onClick={() => addArrayItem('bio')}
                    className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add point
                  </motion.button>
                </motion.div>

                {/* Goals Array */}
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goals
                  </label>
                  <motion.div 
                    className="space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {formData.goals.map((item, index) => (
                      <motion.input
                        key={index}
                        variants={arrayItemVariants}
                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                        initial="hidden"
                        animate="visible"
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(e, 'goals', index)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter goal..."
                      />
                    ))}
                  </motion.div>
                  <motion.button
                    variants={addButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
                    onClick={() => addArrayItem('goals')}
                    className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add goal
                  </motion.button>
                </motion.div>
                
                {/* Motivations Array */}
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivations
                  </label>
                  <motion.div 
                    className="space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {formData.motivations.map((item, index) => (
                      <motion.input
                        key={index}
                        variants={arrayItemVariants}
                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                        initial="hidden"
                        animate="visible"
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(e, 'motivations', index)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter motivation..."
                      />
                    ))}
                  </motion.div>
                  <motion.button
                    variants={addButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
                    onClick={() => addArrayItem('motivations')}
                    className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add motivation
                  </motion.button>
                </motion.div>
                
                {/* Concerns Array */}
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Concerns
                  </label>
                  <motion.div 
                    className="space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {formData.concerns.map((item, index) => (
                      <motion.input
                        key={index}
                        variants={arrayItemVariants}
                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                        initial="hidden"
                        animate="visible"
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(e, 'concerns', index)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter concern..."
                      />
                    ))}
                  </motion.div>
                  <motion.button
                    variants={addButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
                    onClick={() => addArrayItem('concerns')}
                    className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add concern
                  </motion.button>
                </motion.div>
                
                {/* Skills Array */}
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <motion.div 
                    className="space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {formData.skills.map((item, index) => (
                      <motion.input
                        key={index}
                        variants={arrayItemVariants}
                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                        initial="hidden"
                        animate="visible"
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(e, 'skills', index)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter skill..."
                      />
                    ))}
                  </motion.div>
                  <motion.button
                    variants={addButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
                    onClick={() => addArrayItem('skills')}
                    className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add skill
                  </motion.button>
                </motion.div>

                {/* Image Upload */}
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image
                  </label>
                  <motion.div 
                    className="mt-1 flex items-center"
                    whileHover={{ scale: 1.01 }}
                  >
                    <motion.div 
                      className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center"
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                    >
                      {formData.image ? (
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-gray-500"
                        >
                          Selected
                        </motion.span>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      )}
                    </motion.div>
                    <div className="ml-4">
                      <motion.label 
                        htmlFor="image" 
                        className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        whileHover={{ scale: 1.03, backgroundColor: "#f9fafb" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Choose file
                      </motion.label>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <motion.p 
                        className="mt-1 text-xs text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {formData.image ? formData.image.name : "No file selected"}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.section>

              {/* Schedule Section */}
              <motion.section variants={sectionVariants}>
                <motion.h3 
                  className="text-lg font-medium text-gray-900 border-b pb-2 mb-4"
                  variants={itemVariants}
                >
                  Schedule Settings
                </motion.h3>
                
                <motion.div 
                  className="mb-4"
                  variants={itemVariants}
                >
                  <label htmlFor="sessionDuration" className="block text-sm font-medium text-gray-700 mb-1">
                    Session Duration (minutes)
                  </label>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <motion.input
                      whileFocus={{ scale: 1.05, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                      type="number"
                      id="sessionDuration"
                      name="sessionDuration"
                      defaultValue={45}
                      onChange={handleChange}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Available Time Slots
                    </label>
                    <motion.button
                      variants={addButtonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      type="button"
                      onClick={addTimeSlot}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Slot
                    </motion.button>
                  </div>
                  
                  {formData.timeSlots.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="text-center py-4 bg-gray-50 rounded-md border border-dashed border-gray-300"
                    >
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="mx-auto h-6 w-6 text-gray-400"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </motion.svg>
                      <motion.p 
                        className="mt-1 text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        No time slots added yet
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="space-y-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {formData.timeSlots.map((slot, index) => (
                        <motion.div 
                          key={index} 
                          className="p-3 bg-gray-50 rounded-md border border-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 100,
                            damping: 12,
                            delay: index * 0.1
                          }}
                          whileHover={{ scale: 1.01, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <motion.div whileHover={{ scale: 1.02 }}>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                              <motion.input
                                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                                type="date"
                                value={slot.date}
                                onChange={(e) => handleTimeSlotChange(index, 'date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }}>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Start Time</label>
                              <motion.input
                                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }}>
                              <label className="block text-xs font-medium text-gray-500 mb-1">End Time</label>
                              <motion.input
                                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </motion.section>

              {/* Submit Button */}
              <motion.div 
                className="pt-4"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.5, 
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-medium rounded-md shadow-sm hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                >
                  <motion.span
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Create Consultant Profile
                  </motion.span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="ml-2 h-5 w-5"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ConsultantForm;