import React from "react";
import Navbar from "./Navbar";
import { LuShoppingCart } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import VerticalSeparator from "../components/VerticalSeparator";
import useAuthStore from "../zustand/authStore";
import { SlLogin } from "react-icons/sl";
import { GrLogout } from "react-icons/gr";
import { logOutUser } from "../utils/userManagementUtils";

const TopHeader = () => {
  const navigate = useNavigate();
  const { auth, removeAuth } = useAuthStore();

  const handleLogout = () => {
    logOutUser();
    removeAuth();
    navigate("/sign-in");
  };

  return (
    <div className="flex justify-between items-center mt-2 my-5">
      <div className="h-full flex items-center">
        <div className="font-jua text-3xl" onClick={() => navigate("/")}>
          <p className="cursor-pointer">Share a</p>
          <p className="-mt-1 cursor-pointer">Candle</p>
        </div>
      </div>
      <div className="h-full flex items-center">
        <Navbar />
      </div>
      <div className="flex gap-3 mt-5">
        <button>
          <IoLocationOutline className="text-2xl" />
        </button>
        <VerticalSeparator height="35px" margin={1} />
        <button>
          <LuShoppingCart className="text-2xl" />
        </button>
        <VerticalSeparator height="35px" margin={1} />

        {auth && auth.token ? (
          <button>
            <GrLogout
              title="Logout"
              className="text-2xl"
              onClick={() => handleLogout()}
            />
          </button>
        ) : (
          <button>
            <SlLogin
              title="Login"
              className="text-2xl"
              onClick={() => navigate("/sign-in")}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopHeader;
