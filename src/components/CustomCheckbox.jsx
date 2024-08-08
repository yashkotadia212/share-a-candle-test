// CustomCheckbox.js
import React from "react";
import PropTypes from "prop-types";

const CustomCheckbox = ({ checked, disabled }) => {
  const isChecked = checked === "true";
  console.log("bbudsbb", checked, typeof isChecked);
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        className="hidden"
      />
      <span
        className={`w-6 h-6 border-2 ${
          checked ? "border-gray-400" : "border-gray-400"
        } rounded flex-shrink-0 flex items-center justify-center`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </span>
    </label>
  );
};

export default CustomCheckbox;
