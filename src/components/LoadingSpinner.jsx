// components/LoadingSpinner.jsx
import React from 'react';
import { motion } from 'framer-motion';

const dotVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-white z-50" // Tela cheia com fundo branco
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex space-x-2">
        <motion.div
          className="w-4 h-4 bg-blue-500 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="w-4 h-4 bg-blue-500 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
        />
        <motion.div
          className="w-4 h-4 bg-blue-500 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
