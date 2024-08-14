import { useState } from "react";
import { motion } from "framer-motion";
import city1 from "../assets/images/store/store-placeholder.jpg.jpg";
import city2 from "../assets/images/store/store-placeholder.jpg.jpg";
import city3 from "../assets/images/store/store-placeholder.jpg.jpg";
import planet1 from "../assets/images/store/store-placeholder.jpg.jpg";
import planet2 from "../assets/images/store/store-placeholder.jpg.jpg";

//button icons
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const topThreeLeaderData = [
  { image: city1, rank: 1, name: "John Doe", fundraised: 750 },
  {
    image: city2,
    rank: 2,
    name: "Jane Doe",
    fundraised: 500,
  },
  {
    image: city3,
    rank: 3,
    name: "John Doe",
    fundraised: 250,
  },
];

const LeaderboardCarousel = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2]);

  const handleNext = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 3
      );
      return updatedIndexes;
    });
  };

  const handleBack = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 2) % 3
      );

      return updatedIndexes;
    });
  };

  const images = [city1, city2, city3, planet1, planet2];

  const positions = ["center", "left", "right"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    // left1: { x: "-50%", scale: 0.9, zIndex: 3 },
    left: { x: "-50%", scale: 0.9, zIndex: 2 },
    right: { x: "50%", scale: 0.9, zIndex: 1 },
    // right1: { x: "50%", scale: 0.9, zIndex: 3 },
  };
  return (
    <div className="flex items-center flex-col justify-center w-full relative h-[550px] sm:h-[700px] lg:h-[650px] 2xl:h-[650px]">
      {topThreeLeaderData.map((leader, index) => (
        <motion.div
          key={index}
          className="rounded-[12px]"
          initial="center"
          animate={positions[positionIndexes[index]]}
          variants={imageVariants}
          transition={{ duration: 0.5 }}
          style={{ width: "fit-content", position: "absolute" }}
        >
          <LeaderCard
            image={leader.image}
            rank={leader.rank}
            name={leader.name}
            fundraised={leader.fundraised}
          />
        </motion.div>
      ))}
      <div className="flex flex-row gap-3 absolute bottom-0">
        <button
          className="text-black mt-[400px] rounded-full border border-black p-2 flex justify-center items-center"
          onClick={handleBack}
        >
          <HiArrowLongLeft className="text-3xl" />
        </button>
        <button
          className="text-black mt-[400px] rounded-full border border-black p-2 flex justify-center items-center"
          onClick={handleNext}
        >
          <HiArrowLongRight className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

const LeaderCard = ({ image, rank, name, fundraised }) => {
  return (
    <div className="w-80 sm:w-96 max-w-[380px] p-5 aspect-[4/5] bg-gray-200 rounded-xl">
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative aspect-square overflow-hidden rounded-xl"
      >
        <div className="flex items-center justify-center text-white text-xl font-semibold w-full bg-black h-10 absolute bottom-0">
          Rank {rank}
        </div>
      </div>
      <div className="text-center p-4 w-full">
        <div className="text-2xl font-semibold">{name}</div>
        <div className="text-xl font-semibold">${fundraised}</div>
      </div>
    </div>
  );
};

export default LeaderboardCarousel;
