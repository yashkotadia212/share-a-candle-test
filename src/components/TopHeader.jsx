import React from "react";
import Navbar from "./Navbar";
import { LuShoppingCart } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import VerticalSeparator from "../components/VerticalSeparator";
import useAuthStore from "../zustand/authStore";
import { SlLogin } from "react-icons/sl";
import { GrLogout } from "react-icons/gr";

const TopHeader = () => {
  const navigate = useNavigate();
  const { auth, removeAuth } = useAuthStore();

  const handleLogout = () => {
    removeAuth();
    navigate("/login");
  };

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
        <VerticalSeparator height="35px" margin={1} />
        <button>
          <LuShoppingCart className="text-2xl" />
        </button>
        <VerticalSeparator height="35px" margin={1} />

        {auth?.isAuthorized ? (
          <button>
            <GrLogout className="text-2xl" onClick={() => handleLogout()} />
          </button>
        ) : (
          <button>
            <SlLogin className="text-2xl" onClick={() => navigate("/login")} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopHeader;
