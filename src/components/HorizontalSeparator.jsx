import React from "react";

const HorizontalSeparator = ({
  color = "#DCDCDC",
  thickness = "1px",
  width = "100%",
  margin = "10px 0",
}) => {
  const style = {
    backgroundColor: color,
    height: thickness,
    width: width,
    margin: margin,
  };

  return <div style={style} />;
};
export default HorizontalSeparator;
