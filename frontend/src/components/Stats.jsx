import React from 'react';
import { motion } from 'framer-motion';

//Icons
import { PiStudent } from 'react-icons/pi';
import { SlBadge } from 'react-icons/sl';
import { LuVerified } from 'react-icons/lu';
import { AiOutlineStar } from 'react-icons/ai';

const statsData = [
  {
    icon: <PiStudent className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-800" />,
    bg: "bg-cyan-50",
    color: "text-cyan-800",
    value: "25000+",
    label: "Student Counselled",
  },
  {
    icon: <SlBadge className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />,
    bg: "bg-indigo-50",
    color: "text-indigo-400",
    value: "3000+",
    label: "Placed Successfully",
  },
  {
    icon: <LuVerified className="w-8 h-8 sm:w-10 sm:h-10 text-green-700" />,
    bg: "bg-green-50",
    color: "text-green-700",
    value: "99%",
    label: "Visa Success Rate",
  },
  {
    icon: <AiOutlineStar className="w-8 h-8 sm:w-10 sm:h-10 text-orange-900" />,
    bg: "bg-orange-50",
    color: "text-orange-900",
    value: "20+",
    label: "Years of Experience",
  },
];

const Stats = () => {
  return (
    <div className="mx-auto md:max-w-xl lg:max-w-screen-xl grid gap-8 grid-cols-2 lg:grid-cols-4">
      {statsData.map((item, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full shadow-md ${item.bg}`}>
            {item.icon}
          </div>
          <h6 className={`text-base sm:text-2xl lg:text-4xl font-bold ${item.color}`}>{item.value}</h6>
          <p className="text-sm mb-2 font-semibold text-gray-700">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Stats;
