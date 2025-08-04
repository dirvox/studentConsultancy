import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <motion.div
      className="mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div
        className="bg-cover bg-center h-auto text-white py-10 px-4 sm:px-10 md:px-16 lg:px-20 object-fill shadow-2xl rounded-xl sm:rounded-2xl"
        style={{
          backgroundImage:
            'url(https://dl.dropboxusercontent.com/scl/fi/1zf4tfj53xpuekmbbmqy4/promise6.png?rlkey=j69dizr3zuyx0der1sd56qjuc&dl=0)',
        }}
      >
        <motion.div
          className="w-full md:w-2/3 lg:w-1/2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Your Gateway to Global Education and Career Success.
          </motion.h2>

          <motion.p
            className="mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            We guide students every step of the way—from choosing the right university and program, to handling visa processes and preparing for a successful life abroad. Your dreams deserve direction—let us be your trusted partner.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex justify-center sm:justify-start"
          >
            <Link
              to="/connect"
              className="btn bg-white text-primary hover:bg-gray-300 text-sm sm:text-base px-6 py-2 rounded-md font-semibold"
            >
              Connect
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex justify-center sm:justify-start"
          >
            <Link
              to="/programs"
              className="text-sm sm:text-base font-semibold flex items-center gap-1.5 leading-6 text-white hover:text-gray-300 duration-300 transition-colors"
            >
              Our Programs <FaArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <br />
    </motion.div>
  );
};

export default Banner;
