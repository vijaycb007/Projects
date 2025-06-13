import React from "react";
import { useTheme } from "../ThemeContext.jsx"; // use the helper you defined

const Toggle = () => {
  const { theme, toggleTheme } = useTheme(); // ✅ this matches your context export

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`w-12 h-12 flex items-center justify-center rounded-full transition duration-300 shadow-md ${
        isDark ? "bg-[#8245ec]" : "bg-[#f97316]"
      }`}
    >
      <span className="text-2xl">{isDark ? "🌙" : "☀️"}</span>
    </button>
  );
};

export default Toggle;
