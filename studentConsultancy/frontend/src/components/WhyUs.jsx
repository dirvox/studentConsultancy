import React from 'react';
import { motion } from 'framer-motion';

// Icons
import { SiSemanticscholar } from 'react-icons/si';
import { BiUserVoice } from 'react-icons/bi';
import { RiHandCoinLine } from 'react-icons/ri';
import { LiaUniversitySolid, LiaHandsHelpingSolid } from 'react-icons/lia';
import { MdOutlineAssignment } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
import { TbProgressCheck } from 'react-icons/tb';
import { AiOutlineSolution } from 'react-icons/ai';

const items = [
  {
    icon: <TiTickOutline className="w-8 h-8 text-gray-700" />,
    title: "Expertise",
    desc: "Our team consists of experienced and qualified professionals with in-depth knowledge of the education systems and admission processes of various countries.",
  },
  {
    icon: <AiOutlineSolution className="w-10 h-10 text-gray-700" />,
    title: "Customized Solutions",
    desc: "We understand that each student is unique, and we provide personalized solutions based on their individual needs and requirements.",
  },
  {
    icon: <TbProgressCheck className="w-10 h-10 text-gray-700" />,
    title: "Transparency",
    desc: "We maintain complete transparency throughout the process, and our students are regularly updated about the progress of their application.",
  },
  {
    icon: <RiHandCoinLine className="w-10 h-10 text-gray-700" />,
    title: "Affordable Services",
    desc: "We believe that everyone deserves quality education and we offer the lowest fee packages.",
  },
  {
    icon: <LiaUniversitySolid className="w-10 h-10 text-gray-700" />,
    title: "University Selection",
    desc: "We help students select the right course, college or university, and country based on their academic profile, interests, and budget.",
  },
  {
    icon: <LiaHandsHelpingSolid className="w-10 h-10 text-gray-700" />,
    title: "Assistance Guidance",
    desc: "We assist students in the entire application process, including filling out application forms, writing SOPs, essays, and letters of recommendation etc.",
  },
  {
    icon: <MdOutlineAssignment className="w-10 h-10 text-gray-700" />,
    title: "Visa Assistance",
    desc: "We guide students through the visa process, including preparing the required documents, scheduling visa workshops, and providing guidance on visa interview preparation.",
  },
  {
    icon: <BiUserVoice className="w-10 h-10 text-gray-700" />,
    title: "Pre-Departure Briefing",
    desc: "We provide students with a comprehensive briefing on what to expect once they reach their destination country, including information on accommodation, travel, and orientation.",
  },
  {
    icon: <SiSemanticscholar className="w-10 h-10 text-gray-700" />,
    title: "Scholarship Assistance",
    desc: "We provide information on available scholarships and assist students in applying.",
  },
];

const WhyUs = () => {
  return (
    <div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full px-4">
          <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
            <h2 className="mb-4 title">Why Us?</h2>
            <p className="mb-10 subdesc">9 Main Reasons to Choose Dirvox</p>
          </div>
        </div>
      </div>
      <div className="grid row-gap-8  sm:grid-cols-3 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className={`p-8 border-b ${
              (i + 1) % 3 !== 0 ? 'sm:border-r' : ''
            } ${i < 6 ? 'lg:border-r' : ''} ${i < 6 ? '' : 'lg:border-b-0'}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: false, amount: 0.3 }}

          >
            <div className="max-w-md text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 shadow-md">
                {item.icon}
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-800">{item.title}</h6>
              <p className="mb-3 text-sm text-gray-700 leading-5">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
