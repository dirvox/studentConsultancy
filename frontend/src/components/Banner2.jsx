import React from "react";
import { motion } from "framer-motion";
import banner2 from '../assets/company/bannerimg5.png';

const Banner2 = () => {
  return (
    <div
      className="relative w-full  md:h-[70vh] bg-cover bg-center rounded-2xl overflow-hidden flex items-center phone-view-cards"
      style={{ backgroundImage: `url(${banner2})` }}
    >
      <div className="w-full h-full absolute top-0 left-0 bg-black/10 z-0" />

      <motion.div
        className="relative z-10 text-white max-w-3xl pl-6 md:pl-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        <motion.p
          className="text-sm md:text-base font-semibold tracking-widest text-white/80 banner-phone-view-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.4 }}
        >
          STUDY ABROAD
        </motion.p>

        <motion.h1
          className="text-[11px] md:text-6xl font-bold leading-tight mt-2 mb-4 phone-view-banner-h1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false, amount: 0.4 }}
        >
          YOUR GLOBAL<br />EDUCATION JOURNEY STARTS HERE
        </motion.h1>

        <motion.p
          className="text-md md:text-lg mb-6  banner-in-phone-view"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false, amount: 0.4 }}
        >
          Explore top universities, get expert guidance, and apply with confidence.
        </motion.p>

        <motion.button
          className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-purple-700 hover:text-white transition banner-phone-view-button"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: false, amount: 0.4 }}
        >
          GET STARTED
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Banner2;
