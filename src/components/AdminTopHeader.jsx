import React from "react";
import { LuUser2, LuShoppingCart } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Avatar } from "antd";

const AdminTopHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mt-2">
      <div className="h-full flex items-center">
        <div className="font-jua text-3xl" onClick={() => navigate("/")}>
          <p className="cursor-pointer">Share a</p>
          <p className="-mt-8 cursor-pointer">Candle</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button>
          <FaRegBell className="text-4xl border rounded-full p-1" />
        </button>
        <button>
          <Avatar>U</Avatar>
        </button>
      </div>
    </div>
  );
};

export default AdminTopHeader;
