const VerticalSeparator = ({ height, margin }) => {
  return (
    <div
      className={`bg-gray-200 mx-${margin}`} // Default to a light gray color
      style={{ height: height || "100%", width: "2px" }} // Apply height and fixed width
    />
  );
};

export default VerticalSeparator;
