import React from "react";
import TopHeaderMobile from "./TopHeaderMobile";
import TopHeader from "./TopHeader";
import useBreakpoint from "../hooks/useBreakpoint";

const TopHeaderResponsive = () => {
  const currentScreenWidth = useBreakpoint();

  return (
    <div>
      {currentScreenWidth === "xs" ||
      currentScreenWidth === "sm" ||
      currentScreenWidth === "md" ? (
        <TopHeaderMobile />
      ) : (
        <TopHeader />
      )}
    </div>
  );
};

export default TopHeaderResponsive;
