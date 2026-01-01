import React, { useContext } from "react";
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";
import { ThemeContext } from "../ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const iconColor = isDark
    ? "hover:text-purple-500 text-white"
    : "hover:text-orange-500 text-gray-600";

  return (
    <footer
      className={`py-8 px-[12vw] md:px-[7vw] lg:px-[20vw] ${
        isDark ? "bg-transparent text-white" : "bg-white text-gray-600"
      }`}
    >
      <div className="container mx-auto text-center">
        {/* Name */}
        <h2
          className={`text-xl font-semibold ${
            isDark ? "text-purple-500" : "text-orange-500"
          }`}
        >
          VIJAY C B
        </h2>

        {/* Subtitle */}
        <h3
          className={`text-lg mt-2 ${
            isDark ? "text-purple-400" : "text-orange-400"
          }`}
        >
          Thank you for visiting my portfolio.
        </h3>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mt-6">
          {[
            {
              icon: <FaLinkedin />,
              link: "https://www.linkedin.com/in/vijay-c-b-28022004v/",
            },
            {
              icon: <FaInstagram />,
              link: "https://www.instagram.com/chendhira_vijay/",
            },
            {
              icon: <FaWhatsapp />,
              link: "https://wa.me/918867174147",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl transition-transform transform hover:scale-110 ${iconColor}`}
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className={`text-sm mt-6 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          © 2025 Vijay C B. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
