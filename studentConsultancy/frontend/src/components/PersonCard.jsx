import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from 'react-router-dom';

const PersonCard = () => {
  const [people, setPeople] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchConsultants = async () => {
      console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

      try {
        const res = await axios.get("/api/admin/getConsultants");
        setPeople(res.data.consultants);
        console.log("res.data.consultants", res.data.consultants);
      } catch (error) {
        console.error("Failed to fetch consultants:", error);
      }
    };

    fetchConsultants();
  }, []);

  const visiblePeople = showAll ? people : people.slice(0, 4);

  return (
    <div className="flex flex-col items-center ">
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 w-full px-4">
        {visiblePeople.map((person, index) => (
          <motion.div
            key={person._id || index}
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <Link to={`/consultant/${person._id}`} className="block">
              <div className="w-full max-w-[300px] mx-auto relative group rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer">
                <div className="relative w-full h-64 overflow-hidden phone-view-height">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${person.image}`}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center p-4 transition-opacity duration-300">
                    <p className="text-center text-sm">{person.about}</p>
                  </div>
                </div>
                <div className="bg-white text-center py-4">
                  <h3 className="text-lg font-semibold">{person.name}</h3>
                  <p className="text-sm text-gray-500">{person.designation || person.expertise}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {people.length > 4 && (
        <button
          style={{ backgroundColor: "purple" }}
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 mt-2 text-white rounded-full hover:bg-purple-700 transition-all"
        >
          {showAll ? "See Less" : "See All"}
        </button>
      )}
    </div>
  );
};

export default PersonCard;
