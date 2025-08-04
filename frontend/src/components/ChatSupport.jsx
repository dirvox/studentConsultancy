import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const ChatSupport = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
    >
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        title="Need Help?"
        onClick={() => navigate('/connect')}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </motion.div>
  );
};

export default ChatSupport;
