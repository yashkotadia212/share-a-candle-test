import React from "react";
import { motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const topThreeLeaders = [
  {
    image: "https://source.unsplash.com/random/800x800",
    position: 1,
    name: "John Doe",
    fundsRaised: 5467,
  },
  {
    image: "https://source.unsplash.com/random/800x800",
    position: 2,
    name: "Jane Doe",
    fundsRaised: 2456,
  },
  {
    image: "https://source.unsplash.com/random/800x800",
    position: 3,
    name: "John Smith",
    fundsRaised: 7343,
  },
];

const buttonClass =
  "m-3 bg-white border border-black p-2 size-[50px] rounded-full";

const Carr = () => {
  const [cardPositions, setCardPositions] = React.useState([1, 2, 3]);

  function shiftArray(arr, direction) {
    let arrCopy = [...arr];
    if (direction === 1) {
      // Shift elements one index forward
      const lastElement = arrCopy.pop(); // Remove the last element
      arrCopy.unshift(lastElement); // Add it to the beginning
    } else if (direction === -1) {
      // Shift elements one index backward
      const firstElement = arrCopy.shift(); // Remove the first element
      arrCopy.push(firstElement); // Add it to the end
    }
    return arrCopy;
  }

  const handleRightClick = () => {
    setCardPositions(shiftArray(cardPositions, 1));
  };

  const handleLeftClick = () => {
    setCardPositions(shiftArray(cardPositions, -1));
  };

  return (
    <div>
      <div>
        <div className="flex relative p-16 bg-green-300 h-[500px]">
          {topThreeLeaders.map((item, index) => {
            return (
              <div key={item.position}>
                <LeaderCard
                  cardPosition={cardPositions?.at(index)}
                  image={item.image}
                  position={item.position}
                  name={item.name}
                  fundsRaised={item.fundsRaised}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <motion.button
          className={buttonClass}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleLeftClick()}
        >
          <GoArrowLeft className="m-auto text-2xl" />
        </motion.button>
        <motion.button
          className={buttonClass}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleRightClick()}
        >
          <GoArrowRight className="m-auto text-2xl" />
        </motion.button>
      </div>
    </div>
  );
};

// const LeaderCard = ({ image, position, name, fundsRaised, cardPosition }) => {
//   const positionClasses = {
//     1: "left-[calc(40vw-300px)] scale-90 z-0",
//     2: "left-1/2 -translate-x-1/2 z-10 scale-100",
//     3: "right-[calc(40vw-300px)] scale-90 z-0",
//   };

//   const className = positionClasses[cardPosition] || "";

//   return (
//     <motion.div
//       className={`absolute w-[300px] p-5 aspect-[4/5] bg-gray-200 rounded-xl`}
//       animate={{
//         left:
//           cardPosition === 1
//             ? "calc(40vw - 300px)"
//             : cardPosition === 2
//             ? "50%"
//             : "calc(60vw - 300px)",
//         scale: cardPosition === 2 ? 1 : 0.9,
//         zIndex: cardPosition === 2 ? 10 : 0,
//       }}
//       transition={{
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       }}
//     >
//       <div
//         style={{
//           backgroundImage: `url(${image})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//         className="relative aspect-square overflow-hidden rounded-xl bg-blue-500"
//       >
//         <div className="flex items-center justify-center text-white text-xl font-semibold w-full bg-black h-10 absolute bottom-0">
//           {position}
//         </div>
//       </div>
//       <div className="mt-5 text-center text-2xl font-semibold">{name}</div>
//       <div className="mt-2 text-center text-xl font-semibold">
//         ${fundsRaised}
//       </div>
//     </motion.div>
//   );
// };

const LeaderCard = ({ image, position, name, fundsRaised, cardPosition }) => {
  console.log("cardPosition", cardPosition);

  const variantsArray = [
    { scale: 0.9, left: "calc(47vw - 300px)", zIndex: 0 },
    { scale: 1, left: "calc(50vw - 190px)", zIndex: 10 },
    { scale: 0.9, left: "calc(47vw + 15px)", zIndex: 0 },
  ];

  //   const getInital = (cardPosition) => {
  //     if (cardPosition === 1) {
  //       return { scale: 0.9, left: "calc(40vw - 300px)", zIndex: 0 };
  //     } else if (cardPosition === 2) {
  //       return { scale: 1, left: "50%", x: "-50%", zIndex: 10 };
  //     } else {
  //       return { scale: 0.9, right: "calc(60vw - 300px)", zIndex: 0 };
  //     }
  //   };

  //   const getAnimate = (cardPosition) => {
  //     if (cardPosition === 1) {
  //       return { scale: 0.9, left: "calc(40vw - 300px)", zIndex: 0 };
  //     } else if (cardPosition === 2) {
  //       return { scale: 1, left: "50%", x: "-50%", zIndex: 10 };
  //     } else {
  //       return { scale: 0.9, right: "calc(60vw - 300px)", zIndex: 0 };
  //     }
  //   };

  //   const absoluteClass =
  //     cardPosition === 1
  //       ? "left-[calc(40vw-300px)] scale-90"
  //       : cardPosition === 2
  //       ? "left-1/2 -translate-x-1/2 z-10"
  //       : "right-[calc(40vw-300px)] scale-90";

  return (
    <motion.div
      initial={variantsArray[cardPosition - 1]}
      animate={variantsArray[cardPosition === 3 ? 0 : cardPosition]}
      transition={{
        type: "tween",
        duration: 5,
      }}
      className={`absolute w-[300px] p-5 aspect-[4/5] bg-gray-200 rounded-xl`}
    >
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative aspect-square overflow-hidden rounded-xl bg-blue-500"
      >
        <div className="flex items-center justify-center text-white text-xl font-semibold w-full bg-black h-10 absolute bottom-0">
          {position}
        </div>
      </div>
      <div className="mt-5 text-center text-2xl font-semibold">{name}</div>
      <div className="mt-2 text-center text-xl font-semibold">
        ${fundsRaised}
      </div>
    </motion.div>
  );
};

export default Carr;
