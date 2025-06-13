//skills.jsx
import React, { useContext } from "react";
import { SkillsInfo } from "../constants";
import Tilt from "react-parallax-tilt";
import { ThemeContext } from "../ThemeContext.jsx";

const Skills = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section
      id="skills"
      className={`py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient clip-path-custom`}
    >
      <div className="text-center mb-8">
        <h2
          className={`text-3xl sm:text-4xl font-bold ${
            isDark ? "text-white" : "text-[#222]"
          }`}
        >
          SKILLS
        </h2>
        <div
          className={`w-24 h-1 mx-auto mt-2 ${
            isDark ? "bg-[#8245ec]" : "bg-orange-400"
          }`}
        ></div>
        <p
          className={`mt-4 text-lg font-semibold ${
            isDark ? "text-gray-400" : "text-gray-700"
          }`}
        >
          A collection of my technical skills and expertise honed through various
          projects and experiences
        </p>
      </div>

      <div className="flex flex-wrap gap-1 lg:gap-5 py-10 justify-between">
        {SkillsInfo.map((category) => (
          <div
            key={category.title}
            className={`backdrop-blur-md px-6 sm:px-10 py-8 sm:py-6 mb-10 w-full sm:w-[48%] rounded-2xl border shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out ${
              isDark
                ? "bg-gray-900 border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]"
                : "bg-white border-orange-300 shadow-[0_0_20px_1px_rgba(255,169,77,0.25)]"
            }`}
          >
            <h3
              className={`text-2xl sm:text-3xl font-semibold mb-4 text-center ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {category.title}
            </h3>

            <Tilt
              key={category.title}
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              gyroscope={true}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`flex flex-col items-center justify-center rounded-3xl py-3 px-4 min-w-[90px] text-center border-2 ${
                      isDark
                        ? "bg-transparent border-gray-700 text-gray-300"
                        : "bg-orange-50 border-orange-200 text-gray-800"
                    }`}
                  >
                    <img
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      className="w-8 h-8 mb-2"
                    />
                    <span className="text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
