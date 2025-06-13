import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import Navbar from "./components/navbar";
import About from "./components/about";
import Skills from "./components/skills";
import Experience from "./components/experience";
import Work from "./components/work";
import Education from "./components/education";
import Contact from "./components/contact";
import Footer from "./components/footer";
import BlurBlob from "./components/BlurBlob";
import Certificates from "./components/certificate";

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme === "light" ? "bg-white text-gray-700" : "bg-[#050414] text-white"}`}>
      <BlurBlob
        position={{ top: "35%", left: "20%" }}
        size={{ width: "30%", height: "40%" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative pt-20">
        <Navbar />
        <About />
        <Skills />
        <Experience />
        <Work theme={theme}/>
        <Education theme={theme}/>
        <Certificates />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;
