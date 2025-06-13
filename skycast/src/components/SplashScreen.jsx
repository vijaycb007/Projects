import React, { useState, useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onFinish();  // notify App.jsx that splash is done
      }, 1000); // match the transition duration
    }, 3000); // total splash duration
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          backgroundImage: "url('/videos/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-2xl animate-pulse">
          SkyCast ☁️
        </h1>
      </div>
    </div>
  );
}
