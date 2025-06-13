//navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Toggle from "./toggle";
import { ThemeContext } from "../ThemeContext.jsx"; // Ensure you have this context

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "certificates", label: "Certificates" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition duration-300 px-[7vw] md:px-[7vw] lg:px-[20vw] ${
        isScrolled
          ? theme === "dark"
            ? "bg-[#050414]/50 backdrop-blur-md shadow-md"
            : "bg-white/80 backdrop-blur-md shadow-md"
          : theme === "dark"
          ? "bg-transparent"
          : "bg-white"
      }`}
    >
      <div
        className={`py-5 flex justify-between items-center ${
          theme === "dark" ? "text-white" : "text-[#4b5563]"
        }`}
      >
        {/* Logo */}
        <div className="text-lg font-semibold cursor-pointer">
          <span className={theme === "dark" ? "text-white" : "text-[#f97316]"}>
            VIJAY
          </span>
          <span className={theme === "dark" ? "text-white" : "text-[#f97316]"}>
            {" "}
            C B
          </span>
        </div>

        {/* Desktop menu */}
        <ul
          className={`hidden md:flex space-x-8 ${
            theme === "dark" ? "text-gray-300" : ""
          }`}
        >
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer hover:text-${
                theme === "dark" ? "[#8245ec]" : "[#f97316]"
              } ${
                activeSection === item.id
                  ? `text-${theme === "dark" ? "[#8245ec]" : "[#f97316]"}`
                  : ""
              }`}
            >
              <button onClick={() => handleMenuItemClick(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Icons + Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://github.com/vijaycb007/Projects.git"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-${
              theme === "dark" ? "[#8245ec]" : "[#f97316]"
            } ${theme === "dark" ? "text-gray-300" : ""}`}
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/vijay-c-b-28022004v/"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-${
              theme === "dark" ? "[#8245ec]" : "[#f97316]"
            } ${theme === "dark" ? "text-gray-300" : ""}`}
          >
            <FaLinkedin size={24} />
          </a>
          <Toggle />
        </div>

        {/* Hamburger menu */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX
              className={`text-3xl cursor-pointer ${
                theme === "dark" ? "text-[#8245ec]" : "text-[#f97316]"
              }`}
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FiMenu
              className={`text-3xl cursor-pointer ${
                theme === "dark" ? "text-[#8245ec]" : "text-[#f97316]"
              }`}
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 ${
            theme === "dark"
              ? "bg-[#050414]/50 text-gray-300"
              : "bg-[#e0f2fe]/50 text-[#4b5563]"
          } backdrop-filter backdrop-blur-lg z-50 rounded-lg shadow-lg md:hidden`}
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer hover:text-${
                  theme === "dark" ? "white" : "[#f97316]"
                } ${
                  activeSection === item.id
                    ? `text-${theme === "dark" ? "[#8245ec]" : "[#f97316]"}`
                    : ""
                }`}
              >
                <button onClick={() => handleMenuItemClick(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
            <div className="flex space-x-4 items-center">
              <a
                href="https://github.com/vijaycb007/Projects.git"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-${
                  theme === "dark" ? "white" : "[#f97316]"
                }`}
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/vijay-c-b-28022004v/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-${
                  theme === "dark" ? "white" : "[#f97316]"
                }`}
              >
                <FaLinkedin size={24} />
              </a>
              <Toggle />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
