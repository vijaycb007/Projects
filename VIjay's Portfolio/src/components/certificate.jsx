//certificate.jsx
import React from "react";
import { certificates } from "../constants";
import { useTheme } from "../ThemeContext.jsx";

const Certificates = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      id="certificates"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-2"
    >
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold ${isLight ? "text-gray-900" : "text-white"}`}>
          CERTIFICATES
        </h2>
        <div className={`w-32 h-1 mx-auto mt-4 ${isLight ? "bg-[#ff6600]" : "bg-purple-500"}`}></div>
        <p className={`mt-4 text-lg font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`}>
          The certifications and achievements I have earned that demonstrate my skills and knowledge.
        </p>
      </div>

      <div className="relative">
        <div className={`absolute sm:left-1/2 left-0 transform -translate-x-1/2 sm:-translate-x-0 w-1 h-full ${isLight ? "bg-orange-400" : "bg-white"}`}></div>
        <div className="grid md:grid-cols-2 gap-10 relative z-10">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="flex justify-center mb-16">
              <div
                className={`w-full min-h-[320px] sm:max-w-2xl p-6 sm:p-8 rounded-2xl transition-transform duration-300 transform hover:scale-105 flex flex-col justify-between 
                ${isLight
                    ? "border border-gray-300 bg-[#f8f9fa] shadow-md hover:scale-[1.02] hover:shadow-orange-400/50"
                    : "border border-white bg-gray-900 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]"
                }`}
              >
                <div>
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-300">
                      <img
                        src={certificate.img}
                        alt={certificate.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className={`text-xl sm:text-2xl font-semibold ${isLight ? "text-gray-900" : "text-white"}`}>
                          {certificate.name || certificate.title}
                        </h3>
                        {certificate.issuer && (
                          <h4 className="text-md sm:text-sm text-gray-300">
                            {certificate.issuer}
                          </h4>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{certificate.date}</p>
                    </div>
                  </div>

                  <p className={`mt-4 ${isLight ? "text-gray-700" : "text-gray-400"}`}>
                    {certificate.desc}
                  </p>

                  <div className="mt-4">
                    <h5 className={`font-medium ${isLight ? "text-gray-900" : "text-white"}`}>
                      Skills:
                    </h5>
                    <ul className="flex flex-wrap mt-2">
                      {certificate.skills.map((skill, index) => (
                        <li
                          key={index}
                          className={`px-4 py-1 text-xs sm:text-sm rounded-lg mr-2 mb-2 
                          ${isLight
                              ? "bg-[#ff6600] text-white"
                              : "bg-[#8245ec] text-gray-300 border border-gray-400"
                          }`}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
