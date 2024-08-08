import React from "react";
import copy from "copy-text-to-clipboard";
import { BsCopy } from "react-icons/bs";
import { message } from "antd";
// social icons
import { CiTwitter, CiInstagram } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";
import { BiLogoWhatsapp } from "react-icons/bi";

const ShareLink = ({ link }) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white w-full">
      <h2 className="text-2xl mt-2 mb-7">Get Support by Sharing</h2>
      <div className="flex items-center w-10/12 mb-2 relative">
        <input
          type="text"
          value={link}
          title={link}
          readOnly
          className="flex-1 p-2 border border-gray-300 rounded-lg pe-10"
        />

        <button className="absolute right-3">
          <BsCopy
            className="text-xl hover:text-gray-400 transition"
            onClick={() => {
              copy(link);
              message.success("Code copied to clipboard");
            }}
          />
        </button>
      </div>
      <div className="flex justify-around w-8/12 mt-5 mb-8">
        <CopySocialButton>
          <SlSocialFacebook className="text-xl" />
        </CopySocialButton>
        <CopySocialButton>
          <BiLogoWhatsapp className="text-xl" />
        </CopySocialButton>
        <CopySocialButton>
          <CiInstagram className="text-xl" />
        </CopySocialButton>
        <CopySocialButton>
          <CiTwitter className="text-xl" />
        </CopySocialButton>
      </div>
    </div>
  );
};

const CopySocialButton = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <button className="w-12 h-12 flex justify-center items-center border border-gray-300 rounded-full bg-white">
        {children}
      </button>
      <div className="text-xs text-gray-500">Facebook</div>
    </div>
  );
};

export default ShareLink;
