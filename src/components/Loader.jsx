import React from "react";
import "../assets/css/Loader.css"; // Import the CSS file for custom styles

const Loader = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="relative flex items-center justify-center h-fit">
        {/* Candle */}
        <div className="candle w-24 bg-black rounded-t-lg">
          <div className="flame absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-full"></div>
        </div>
        {/* Base */}
        <div className="base w-28 h-8 bg-gray-800 rounded-b-lg"></div>
      </div>
    </div>
  );
};

export default Loader;
