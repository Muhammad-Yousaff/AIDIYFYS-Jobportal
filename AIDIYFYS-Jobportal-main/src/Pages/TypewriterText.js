import React from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text }) => {
  return (
    <p className="tracking-tight mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-10 text-center whitespace-nowrap overflow-hidden">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </p>
  );
};

export default TypewriterText;
