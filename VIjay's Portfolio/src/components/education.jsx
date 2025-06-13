import React from "react";
import { education } from "../constants";

const Education = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <section
      id="education"
      className={`py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans relative ${
        isDark ? "bg-skills-gradient clip-path-custom-3" : "bg-white"
      }`}
    >
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-700"}`}>
          EDUCATION
        </h2>
        <div className={`w-32 h-1 mx-auto mt-4 ${isDark ? "bg-purple-500" : "bg-orange-500"}`} />
        <p className={`mt-4 text-lg font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          My education has been a journey of learning and development. Here are
          the details of my academic background
        </p>
      </div>

      <div className="relative z-0">
        {/* Vertical line behind cards */}
        <div
          className={`absolute sm:left-1/2 left-0 transform -translate-x-1/2 sm:-translate-x-0 w-1 ${
            isDark ? "bg-white" : "bg-orange-400"
          } h-full z-0`}
        ></div>

        {education.map((edu, index) => (
          <div
            key={edu.id}
            className={`relative z-10 flex flex-col sm:flex-row items-center mb-16 ${
              index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            }`}
          >
            <div
              className={`w-full sm:max-w-md p-4 sm:p-8 rounded-2xl border transition-transform transform duration-300 hover:scale-105 ${
                isDark
                  ? "bg-gray-900 backdrop-blur-md border-white text-gray-400 shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]"
                  : "bg-white border-orange-400 text-gray-600 shadow-2xl hover:shadow-orange-200"
              } sm:ml-44 sm:mr-44 ml-8`}
            >
              <div className="flex items-center space-x-6">
                <div
                  className={`w-24 h-16 rounded-md overflow-hidden ${
                    isDark ? "bg-white" : "bg-orange-100 border border-orange-300"
                  }`}
                >
                  <img
                    src={edu.img}
                    alt={edu.school}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-700"}`}>
                      {edu.degree}
                    </h3>
                    <h4 className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {edu.school}
                    </h4>
                  </div>
                  <p className={`text-sm mt-2 ${isDark ? "text-gray-500" : "text-orange-500"}`}>
                    {edu.date}
                  </p>
                </div>
              </div>

              <p className={`mt-4 font-bold ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                Grade: {edu.grade}
              </p>
              <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {edu.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
