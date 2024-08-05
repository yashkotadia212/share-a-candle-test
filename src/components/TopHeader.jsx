import React from "react";
import Navbar from "./Navbar";
import { LuUser2, LuShoppingCart } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TopHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mt-2">
      <div className="h-full flex items-center">
        <div className="font-jua text-3xl" onClick={() => navigate("/")}>
          <p className="cursor-pointer">Share a</p>
          <p className="-mt-8 cursor-pointer">Candle</p>
        </div>
      </div>
      <div className="h-full flex items-center">
        <Navbar />
      </div>
      <div className="flex gap-3">
        <button>
          <IoLocationOutline className="text-2xl" />
        </button>
        <button>
          <LuShoppingCart className="text-2xl" />
        </button>

        <button>
          <LuUser2 className="text-2xl" onClick={() => navigate("/login")} />
        </button>
      </div>
    </div>
  );
};

export default TopHeader;
