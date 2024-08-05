const VerticalSeparator = ({ height, margin }) => {
  return (
    <div
      className={`bg-gray-200`} // Default to a light gray color
      style={{
        height: height || "100%",
        width: "2px",
        marginInline: `${margin}px`,
      }} // Apply height and fixed width
    />
  );
};

export default VerticalSeparator;
