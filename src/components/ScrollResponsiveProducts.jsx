import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const numberOfProducts = 10;

const ScrollResponsiveProducts = () => {
  // Create a ref for the container
  const ref = useRef(null);

  // Check if the component is in view
  const isInView = useInView(ref, { once: true, amount: "all" });

  // Capture the scroll progress
  const { scrollYProgress } = useScroll();

  // Transform the scroll progress to a horizontal scroll effect
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isInView ? -150 * numberOfProducts : 0]
  );

  return (
    <div
      ref={ref}
      className="relative h-fit bg-theme-background py-10 px-8 overflow-hidden"
    >
      <motion.div
        style={{ x }}
        className="flex items-center justify-start gap-[15rem]"
      >
        {Array.from({ length: numberOfProducts }).map((_, index) => (
          <Productcard key={index} num={index} />
        ))}
      </motion.div>
    </div>
  );
};

const Productcard = ({ num }) => {
  return (
    <div className="flex items-center gap-4">
      <div
        style={{
          backgroundImage: `url(https://picsum.photos/200)`,
        }}
        className="w-20 h-14 bg-center bg-cover overflow-hidden"
      ></div>
      <div>Product Name {num}</div>
    </div>
  );
};

export default ScrollResponsiveProducts;
