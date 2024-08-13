import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";

const cards = [
  { title: "Card 1", description: "This is the first card." },
  { title: "Card 2", description: "This is the second card." },
  { title: "Card 3", description: "This is the third card." },
];

const ThreeDCarousel = () => {
  return (
    <div className="max-w-lg mx-auto">
      <Swiper
        className="bg-green-400"
        spaceBetween={-50} // Slightly overlap slides
        slidesPerView={3}
        centeredSlides={true} // Center the active slide
        initialSlide={1} // Set the middle slide as active by default
        loop={true}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <motion.div
                className={`p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-500 ${
                  isActive ? "scale-105 z-30" : "scale-100 z-20"
                }`}
                animate={{
                  scale: isActive ? 1.05 : 1.0,
                  opacity: isActive ? 1 : 0.75,
                }}
              >
                <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThreeDCarousel;
