import React from "react";
import { experiences } from "../constants";
import { useTheme } from "../ThemeContext.jsx";

const Experience = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="experience"
      className="py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-2"
    >
      <div className="text-center mb-16">
        <h2
          className={`text-4xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          EXPERIENCE
        </h2>
        <div
          className={`w-32 h-1 mx-auto mt-4 ${
            isDark ? "bg-purple-500" : "bg-[#ff6600]"
          }`}
        ></div>
        <p
          className={`mt-4 text-lg ${
            isDark ? "text-gray-400 font-semibold" : "text-gray-600 font-medium"
          }`}
        >
          My work experience and the roles I have taken in organizations.
        </p>
      </div>

      <div className="flex flex-col items-center relative">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className={`flex w-full max-w-4xl items-center justify-between relative mb-16`}
          >
            {/* Left card */}
            {index % 2 === 0 && (
              <div className="w-[48%] z-10">
                <ExperienceCard experience={experience} isDark={isDark} />
              </div>
            )}

            {/* Vertical line and circle in the center */}
            <div className="flex flex-col items-center justify-center z-0">
              <div
                className={`w-1 h-full ${
                  isDark ? "bg-white" : "bg-orange-400"
                }`}
              ></div>
              <div
                className={`w-4 h-4 rounded-full ${
                  isDark ? "bg-purple-500" : "bg-orange-400"
                } border-2 border-white`}
              ></div>
            </div>

            {/* Right card */}
            {index % 2 !== 0 && (
              <div className="w-[48%] z-10">
                <ExperienceCard experience={experience} isDark={isDark} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience, isDark }) => (
  <div
    className={`w-full p-6 sm:p-8 rounded-2xl border transform transition-transform duration-300 hover:scale-[1.02] ${
      isDark
        ? "bg-gray-900 text-gray-400 border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]"
        : "bg-[#f8f9fa] text-gray-700 border-gray-300 shadow-md hover:shadow-orange-400/50"
    }`}
  >
    <div className="flex items-center space-x-6">
      <div
        className={`w-16 h-16 bg-white rounded-md overflow-hidden ${
          isDark ? "" : "border border-gray-300"
        }`}
      >
        <img
          src={experience.img}
          alt={experience.company}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h3
            className={`text-xl sm:text-2xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {experience.role}
          </h3>
          <h4
            className={`text-md sm:text-sm ${
              isDark ? "text-gray-300" : "text-[#007bff]"
            }`}
          >
            {experience.company}
          </h4>
        </div>
        <p className={`text-sm mt-2 text-gray-500`}>{experience.date}</p>
      </div>
    </div>

    <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-700"}`}>
      {experience.desc}
    </p>
    <div className="mt-4">
      <h5 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
        Skills:
      </h5>
      <ul className="flex flex-wrap mt-2">
        {experience.skills.map((skill, index) => (
          <li
            key={index}
            className={`px-4 py-1 text-xs sm:text-sm rounded-lg mr-2 mb-2 ${
              isDark
                ? "bg-[#8245ec] text-gray-300 border border-gray-400"
                : "bg-[#ff6600] text-white"
            }`}
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Experience;
