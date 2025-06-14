//about.jsx
import React from "react";
import { useTheme } from "../ThemeContext.jsx";
import { Typewriter } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import profileImage from "../assets/profile/profile2.png";

const About = () => {
  const { theme } = useTheme();

  const isLight = theme === "light";

  return (
    <section
      id="about"
      className="py-4 px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans mt-16 md:mt-24 lg:mt-32"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight ${
              isLight ? "text-[#4b5563]" : "text-white"
            }`}
          >
            Hi, I am
          </h1>
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight ${
              isLight ? "text-[#4b5563]" : "text-white"
            }`}
          >
            Vijay C B
          </h2>
          <h3
            className={`text-xl sm:text-2xl md:text-3xl font-semibold mb-4 leading-tight ${
              isLight ? "text-[#f97316]" : "text-[#8245ec]"
            }`}
          >
            <span className={isLight ? "text-[#4b5563]" : "text-white"}>
              I am a{" "}
            </span>
            <Typewriter
              words={[
                "Frontend Developer",
                "Web Developer",
                "UI/UX Designer",
                "Coder",
              ]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h3>
          <p
            className={`text-base sm:text-lg md:text-lg mb-10 mt-8 leading-relaxed ${
              isLight ? "text-[#4b5563]" : "text-gray-400"
            }`}
          >
            I'm an aspiring web developer with a strong interest in frontend
            development, UI/UX design, and modern web technologies. I’m
            continuously learning and building projects to sharpen my skills in
            HTML, CSS, JavaScript, React, and design tools like Figma, Vite
            etc. Excited to contribute, collaborate, and grow in the dynamic
            world of web development.
          </p>
          <a
            href="https://drive.google.com/file/d/1LdIqrKLVZr1wormRQvhoe9Yw4eIyTYyQ/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white py-3 px-8 rounded-full mt-5 text-lg font-bold transition duration-300 transform hover:scale-105"
            style={{
              background: isLight
                ? "linear-gradient(90deg, #f97316, #fb923c)"
                : "linear-gradient(90deg, #8245ec, #a855f7)",
              boxShadow: isLight
                ? "0 0 4px #f97316, 0 0 6px #f97316, 0 0 25px #fdba74"
                : "0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec",
            }}
          >
            DOWNLOAD CV
          </a>
        </div>

        {/* Profile Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Tilt
            className={`w-48 h-48 sm:w-64 sm:h-64 md:w-[30rem] md:h-[30rem] rounded-full border-4 ${
              isLight ? "border-[#e0f2fe]" : "border-purple-700"
            }`}
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <img
              src={profileImage}
              alt="Vijay C B"
              className={`w-full h-full rounded-full object-cover ${
                isLight
                  ? "drop-shadow-[0_10px_20px_rgba(14,165,233,0.5)]"
                  : "drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
              }`}
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default About;
