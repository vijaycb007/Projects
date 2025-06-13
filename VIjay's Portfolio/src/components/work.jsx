import React, { useState } from "react";
import { projects } from "../constants";

const Work = ({ theme }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const isDark = theme === "dark";

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const codingProjects = projects.slice(0, 5);
  const figmaProjects = projects.slice(5);

  return (
    <section
      id="work"
      className={`py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans ${
        isDark ? "bg-[#050414] text-white" : "bg-white text-gray-700"
      }`}
    >
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-700"}`}>
          PROJECTS
        </h2>
        <div className={`w-32 h-1 mx-auto mt-4 ${isDark ? "bg-purple-500" : "bg-orange-500"}`}></div>
        <p className={`mt-4 text-lg font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          A showcase of the projects I have worked on, highlighting my skills and experience in various technologies.
        </p>
      </div>

      {/* Coding Projects */}
      <div className="mb-16">
        <h3 className={`text-3xl font-bold mb-10 text-center ${isDark ? "text-white" : "text-gray-700"}`}>
          Coding Projects
        </h3>
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {codingProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenModal(project)}
              className={`border rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300 ${
                isDark
                  ? "border-white bg-gray-900 hover:shadow-purple-500/50"
                  : "border-orange-500 bg-white hover:shadow-orange-400/50"
              }`}
            >
              <div className="p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                  {project.title}
                </h3>
                <p className={`mb-4 pt-4 line-clamp-3 ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                  {project.description}
                </p>
                <div className="mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-block text-xs font-semibold rounded-full px-2 py-1 mr-2 mb-2 ${
                        isDark
                          ? "bg-[#251f38] text-purple-500"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Figma Projects */}
      <div>
        <h3 className={`text-3xl font-bold mb-10 text-center ${isDark ? "text-white" : "text-gray-700"}`}>
          Figma Projects
        </h3>
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {figmaProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenModal(project)}
              className={`border rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300 ${
                isDark
                  ? "border-white bg-gray-900 hover:shadow-purple-500/50"
                  : "border-orange-500 bg-white hover:shadow-orange-400/50"
              }`}
            >
              <div className="p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                  {project.title}
                </h3>
                <p className={`mb-4 pt-4 line-clamp-3 ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                  {project.description}
                </p>
                <div className="mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-block text-xs font-semibold rounded-full px-2 py-1 mr-2 mb-2 ${
                        isDark
                          ? "bg-[#251f38] text-purple-500"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          <div
            className={`rounded-xl shadow-2xl lg:w-full w-[90%] max-w-3xl overflow-hidden relative ${
              isDark ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={handleCloseModal}
                className={`text-3xl font-bold ${
                  isDark ? "text-white hover:text-purple-500" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col">
              <div className={`w-full flex justify-center px-4 ${isDark ? "bg-gray-900" : "bg-white"}`}>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="lg:w-full w-[95%] object-contain rounded-xl shadow-xl"
                />
              </div>
              <div className="lg:p-8 p-6">
                <h3 className={`lg:text-3xl font-bold mb-4 text-md ${isDark ? "text-white" : "text-gray-700"}`}>
                  {selectedProject.title}
                </h3>
                <p className={`mb-6 lg:text-base text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`text-xs font-semibold rounded-full px-2 py-1 ${
                        isDark
                          ? "bg-[#251f38] text-purple-500"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-1/2 rounded-xl text-center font-semibold ${
                      isDark
                        ? "bg-gray-800 hover:bg-purple-800 text-gray-400 lg:px-6 lg:py-2 px-2 py-1 text-sm lg:text-xl"
                        : "bg-blue-100 hover:bg-blue-200 text-gray-700 px-6 py-2 text-xl"
                    }`}
                  >
                    View Code
                  </a>
                  <a
                    href={selectedProject.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-1/2 rounded-xl text-center font-semibold ${
                      isDark
                        ? "bg-purple-600 hover:bg-purple-800 text-white lg:px-6 lg:py-2 px-2 py-1 text-sm lg:text-xl"
                        : "bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-xl"
                    }`}
                  >
                    View Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
