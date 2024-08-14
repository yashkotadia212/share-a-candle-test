import { useState, useEffect } from "react";

const breakpoints = {
  xs: [320, 640],
  sm: [640, 768],
  md: [768, 1024],
  lg: [1024, 1280],
  xl: [1280, 1536],
  "2xl": [1536, Infinity],
};

const getBreakpoint = (width) => {
  for (const key in breakpoints) {
    const [min, max] = breakpoints[key];
    if (width >= min && width < max) {
      return key;
    }
  }
  return "xs"; // Default to 'xs' if no other match is found
};

const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(() =>
    getBreakpoint(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return currentBreakpoint;
};

export default useBreakpoint;
