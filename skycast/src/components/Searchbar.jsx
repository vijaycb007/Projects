import React from "react";

export default function SearchBar({ city, setCity, getWeather, handleKeyPress }) {
  return (
    <div className="flex mb-8">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-grow p-3 rounded-l-lg bg-gray-400/60 bg-opacity-30 text-black font-bold text-sm placeholder-white-400/60 border border-gray-400 focus:outline-none"
      />
      <button
        onClick={getWeather}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-lg font-semibold"
      >
        Search
      </button>
    </div>
  );
}
