import React from "react";
import { motion } from "framer-motion";
//Icons
import { GiPayMoney } from 'react-icons/gi'
import { FaUniversity } from 'react-icons/fa'
import { BsBriefcaseFill } from 'react-icons/bs'
import { GiSkills } from 'react-icons/gi'
import { MdModelTraining } from 'react-icons/md'
import { PiStudentFill } from 'react-icons/pi'

const Features = () => {
    const features = [
      {
        title: "No/Low Tuition Fee Charge",
        details: "We provide no/low tuition fee options for accessible and affordable education.",
        icon: <GiPayMoney className="text-white w-auto h-32" />,
      },
      {
        title: "Higher Ranked University",
        details: "We offer programs affiliated with higher-ranked universities for quality education.",
        icon: <FaUniversity className="text-white w-auto h-32" />,
      },
      {
        title: "Better Job Prospects",
        details: "Our programs provide better job prospects for future career success.",
        icon: <BsBriefcaseFill className="text-white w-auto h-32" />,
      },
      {
        title: "Skill Based Programs",
        details: "To enhance practical expertise and career readiness.",
        icon: <GiSkills className="text-white w-auto h-32" />,
      },
      {
        title: "On the Job Training",
        details: "To provide real-world experience and practical skills.",
        icon: <MdModelTraining className="text-white w-auto h-32" />,
      },
    //   {
    //     title: "Scholarship & Financial Aid",
    //     details: "To support students in pursuing their educational goals.",
    //     icon: <PiStudentFill className="text-white w-auto h-32" />,
    //   },
    ];
  
    return (
     <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: false, amount: 0.3 }}
  className="px-4 sm:px-6 lg:px-8 "
>
  <div className="max-w-xl text-center mx-auto lg:max-w-2xl mb-12">
    <h2 className="mb-6">
      <span className="relative inline-block">
        <svg
          viewBox="0 0 52 24"
          fill="currentColor"
          className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width=".135" height=".30">
              <circle cx="1" cy="1" r=".7" />
            </pattern>
          </defs>
          <rect fill="url(#dots)" width="52" height="24" />
        </svg>
        <span className="relative text-primary title">Features</span>
      </span>
    </h2>
    <p className="mb-10 subdesc">
      Our entire team works enthusiastically to guide you about Dirvox Programs
      which give you the following benefits:
    </p>
  </div>

  {/* Scrollable on Mobile */}
  <div className="flex gap-6 overflow-x-auto md:overflow-visible px-2 md:justify-center md:flex-wrap">
    {features.map((item, index) => (
      <FeatureCard key={index} {...item} index={index} />
    ))}
  </div>
</motion.div>

    );
  };
  

export default Features;

const FeatureCard = ({ icon, title, details, index }) => {
    return (
      <div
        className="w-full sm:w-[45%] md:w-[30%] lg:w-auto min-w-[220px] m-1"
        

      >
      <div className="rounded-[20px] bg-white p-2 shadow-md">
  <div className="flex justify-center">
    <div className="mb-6 flex h-[60px] w-[60px] p-3 items-center justify-center rounded-2xl bg-primary">
      {icon}
    </div>
  </div>

  <h4 className="text-sm sm:text-base mb-2 font-semibold text-primary text-center">
    {title}
  </h4>
</div>


      </div>
    );
  };
  