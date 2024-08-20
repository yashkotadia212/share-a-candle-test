import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import VerticalSeparator from "../components/VerticalSeparator";
import useAuthStore from "../zustand/authStore";
import { SlLogin } from "react-icons/sl";
import { GrLogout } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import { navData } from "./Navbar";

function TopHeaderMobile() {
  const navigate = useNavigate();
  const { auth, removeAuth } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  const iconList = [
    { icon: <IoLocationOutline /> },
    { icon: <LuShoppingCart /> },
    {
      icon: auth?.isAuthorized ? (
        <GrLogout
          onClick={() => {
            removeAuth();
            navigate("/sign-in");
          }}
        />
      ) : (
        <SlLogin onClick={() => navigate("/login")} />
      ),
    },
  ];

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const modalVariants = {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: 0,
      zIndex: 100,
      transition: {
        type: "tween", // Set transition type to 'tween'
        duration: 0.2, // Specify duration
      },
    },
    exit: {
      y: "-100vh",
      transition: {
        type: "tween",
        duration: 0.2,
        delay: 0.4,
      },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: "50%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut", // Add ease-out easing function
      },
    },
    exit: {
      opacity: 0,
      y: "50%",
      transition: {
        duration: 0.1,
        ease: "easeOut", // Add ease-out easing function
      },
    },
  };

  const navLinksVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <nav className="h-fit py-4 px-4">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl">
          <div className="font-jua text-3xl" onClick={() => navigate("/")}>
            <p className="cursor-pointer">Share a</p>
            <p className="-mt-8 cursor-pointer">Candle</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex gap-2 items-center cursor-pointer">
            {iconList.map((item, index) => (
              <React.Fragment key={index}>
                <div className="text-xl">{item.icon}</div>
                {index + 1 !== iconList.length && (
                  <VerticalSeparator height="35px" margin={1} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="ms-5">
            <FaBars className="text-xl cursor-pointer" onClick={toggleModal} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <FaTimes
              className="absolute top-[6%] right-[8%] text-white cursor-pointer text-3xl"
              onClick={toggleModal}
            />
            <motion.div
              className="relative bg-black w-full"
              variants={navLinksVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col gap-8 items-center justify-center h-full">
                {navData?.map((link, index) => (
                  <motion.span
                    key={index}
                    className="text-white font-light text-2xl cursor-pointer"
                    variants={linkItemVariants}
                    onClick={() => navigate(link.url)}
                  >
                    {link.title}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default TopHeaderMobile;
