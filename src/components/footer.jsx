import React, { useContext } from "react";
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";
import { ThemeContext } from "../ThemeContext"; // ✅ Import context

const Footer = () => {
  const { theme } = useContext(ThemeContext); // ✅ Access context
  const isDark = theme === "dark";

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navColor = isDark ? "hover:text-purple-500 text-white" : "hover:text-orange-500 text-gray-600";
  const iconColor = isDark ? "hover:text-purple-500 text-white" : "hover:text-orange-500 text-gray-600";

  return (
    <footer
      className={`py-8 px-[12vw] md:px-[7vw] lg:px-[20vw] ${
        isDark ? "bg-transparent text-white" : "bg-white text-gray-600"
      }`}
    >
      <div className="container mx-auto text-center">
        {/* Name / Logo */}
        <h2 className={`text-xl font-semibold ${isDark ? "text-purple-500" : "text-orange-500"}`}>
          VIJAY C B
        </h2>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4">
          {[
            { name: "About", id: "about" },
            { name: "Skills", id: "skills" },
            { name: "Experience", id: "experience" },
            { name: "Projects", id: "projects" },
            { name: "Education", id: "education" },
            { name: "Certificates", id: "certificates" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => handleScroll(item.id)}
              className={`text-sm sm:text-base my-1 ${navColor}`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center space-x-4 mt-6">
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
        <p className={`text-sm mt-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          © 2025 Vijay C B. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
