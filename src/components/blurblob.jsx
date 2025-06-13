//blurblob.jsx
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../ThemeContext.jsx";

const BlurBlob = ({ position, size }) => {
  const { theme } = useTheme();
  const { top, left } = position;
  const { width, height } = size;

  const isLight = theme === "light";

  return (
    <div
      className="absolute"
      style={{
        top: top,
        left: left,
        width: width,
        height: height,
        transform: "translate(-50%, -50%)",
        zIndex: 0,
      }}
    >
      <div
        className={`w-full h-full rounded-full blur-3xl animate-blob ${
          isLight ? "opacity-30" : "opacity-20 bg-purple-500"
        }`}
        style={
          isLight
            ? {
                background: "radial-gradient(circle, #ffcf91, transparent 70%)",
              }
            : undefined
        }
      ></div>
    </div>
  );
};

BlurBlob.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
  size: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
};

export default BlurBlob;
