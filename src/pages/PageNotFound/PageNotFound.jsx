import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PageNotFound = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -30 }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex flex-col justify-center items-center"
    >
      <motion.h1
        className="text-6xl font-bold text-gray-800 mb-4"
        initial={{ y: -250 }}
        animate={{ y: -10 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        404
      </motion.h1>
      <motion.h2
        className="text-2xl font-semibold text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Page Not Found
      </motion.h2>
      <p className="text-gray-500 mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full"
        >
          Go Home
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default PageNotFound;
