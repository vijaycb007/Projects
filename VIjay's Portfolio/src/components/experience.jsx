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
        <h2 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          EXPERIENCE
        </h2>
        <div className={`w-32 h-1 mx-auto mt-4 ${isDark ? "bg-purple-500" : "bg-[#ff6600]"}`}></div>
        <p className={`mt-4 text-lg ${isDark ? "text-gray-400 font-semibold" : "text-gray-600 font-medium"}`}>
          My internship and work experience reflect the roles and responsibilities I’ve handled in different organizations..
        </p>
      </div>

     <div className="relative z-0">
        {/* Vertical line behind cards */}
        <div
          className={`absolute sm:left-1/2 left-0 transform -translate-x-1/2 sm:-translate-x-0 w-1 ${
            isDark ? "bg-white" : "bg-orange-400"
          } h-full z-0`}
        ></div>

        {/* Cards */}
        {experiences.map((experience) => (
          <div key={experience.id} className="w-full max-w-2xl mb-16 relative z-10">
            <div
              className={`p-6 sm:p-8 rounded-2xl border transform transition-transform duration-300 hover:scale-[1.02] ${
                isDark
                  ? "bg-gray-900 text-gray-400 border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]"
                  : "bg-[#f8f9fa] text-gray-700 border-gray-300 shadow-md hover:shadow-orange-400/50"
              }`}
            >
              <div className="flex items-center space-x-6">
                <div
                  className={`w-16 h-16 bg-white rounded-md overflow-hidden ${isDark ? "" : "border border-gray-300"}`}
                >
                  <img src={experience.img} alt={experience.company} className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {experience.role}
                    </h3>
                    <h4 className={`text-md sm:text-sm ${isDark ? "text-gray-300" : "text-[#007bff]"}`}>
                      {experience.company}
                    </h4>
                  </div>
                  <p className="text-sm mt-2 text-gray-500">{experience.date}</p>
                </div>
              </div>

              <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-700"}`}>{experience.desc}</p>

              <div className="mt-4">
                <h5 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Skills:</h5>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
