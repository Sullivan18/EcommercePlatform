// components/LoadingBar.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LoadingBar = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="relative w-64 h-2 bg-gray-300 rounded">
        <motion.div
          className="absolute h-2 bg-blue-500 rounded"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;
