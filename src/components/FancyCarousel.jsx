import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "../assets/css/FancyCarousel.css"; // Import CSS file

const FancyCarousel = () => {
  const [xPos, setXPos] = useState(0);
  const ringRef = useRef(null);
  const draggerRef = useRef(null);
  const rotateY = useMotionValue(0);

  // Calculate background position for parallax effect
  const getBgPos = (i) => {
    const currentRotation = rotateY.get();
    const position =
      (-Math.round(currentRotation - 180 - i * 36, 0, 360) / 360) * 400;
    return `${position}px 0px`;
  };

  const handleDrag = (event, info) => {
    const newXPos = Math.round(info.point.x);
    const deltaX = newXPos - xPos;
    rotateY.set((prev) => prev - deltaX);
    setXPos(newXPos);
  };

  const handleDragEnd = () => {
    setXPos(0);
    // Optional: Snap to nearest image if needed
  };

  return (
    <div>
      <div className="container">
        <motion.div
          id="ring"
          ref={ringRef}
          style={{ rotateY: rotateY }}
          className="ring"
        >
          {[...Array(10).keys()].map((i) => (
            <motion.div
              key={i}
              className="img"
              style={{
                backgroundPosition: getBgPos(i),

                backgroundImage: `url(https://picsum.photos/200/300?random=${i})`,
              }}
            />
          ))}
        </motion.div>

        <div className="vignette"></div>

        <motion.div
          id="dragger"
          ref={draggerRef}
          className="dragger"
          drag="x"
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
};

export default FancyCarousel;
