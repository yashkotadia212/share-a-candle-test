import React from "react";
import { Button } from "antd";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";

const CustomButton = ({
  type = "primary",
  children,
  onClick,
  isArrowVisible,
}) => {
  const typeBasedClassName =
    type === "secondary" ? "bg-theme-background text-black" : "";

  return (
    <Button className={typeBasedClassName} type={type} onClick={onClick}>
      <div className="flex items-center gap-2">
        <div>{children}</div>
        {(type === "primary" || isArrowVisible) && (
          <div>
            <GoArrowRight className="text-xl" />
          </div>
        )}
      </div>
    </Button>
  );
};

export default CustomButton;
