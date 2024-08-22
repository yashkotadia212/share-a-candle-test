import React from "react";
import "../assets/css/Loader.css"; // Import the CSS file for custom styles
import { motion } from "framer-motion";

const variants = {
  initial: {
    scaleY: 0.4,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const Loader = () => {
  return (
    <div className="h-screen w-full grid place-content-center bg-white px-4 py-24">
      <BarLoader />
    </div>
  );
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.1,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div
        variants={variants}
        className="h-24 w-3 rounded-sm bg-black"
      />
      <motion.div
        variants={variants}
        className="h-24 w-3 rounded-sm bg-black"
      />
      <motion.div
        variants={variants}
        className="h-24 w-3 rounded-sm bg-black"
      />
      <motion.div
        variants={variants}
        className="h-24 w-3 rounded-sm bg-black"
      />
      <motion.div
        variants={variants}
        className="h-24 w-3 rounded-sm bg-black"
      />
    </motion.div>
  );
};

export default Loader;
