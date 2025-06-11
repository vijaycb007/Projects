import React from "react";

export default function WeatherCard({ weather }) {
  const formatTime = (timestamp, timezone) => {
    const localTime = new Date((timestamp + timezone) * 1000);
    return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getLocalTime = (timezone) => {
    const currentUTC = Date.now();
    const local = new Date(currentUTC + timezone * 1000);
    return local.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="text-black text-center space-y-4">
      <h2 className="text-3xl font-semibold">{weather.name}, {weather.country}</h2>
      <p className="text-2xl">🌡 {weather.main.temp}°C</p>
      <p className="text-lg">Feels Like: {weather.main.feels_like}°C</p>
      <p className="text-xl">🌧 {weather.weather[0].main}</p>
      <p className="text-lg">💧 Humidity: {weather.main.humidity}%</p>
      <p className="text-lg">🌬 Wind: {weather.wind.speed} m/s</p>
      <p className="text-lg">🌅 Sunrise: {formatTime(weather.sunrise, weather.timezone)}</p>
      <p className="text-lg">🌇 Sunset: {formatTime(weather.sunset, weather.timezone)}</p>
      <p className="text-lg">🕰 Local Time: {getLocalTime(weather.timezone)}</p>
    </div>
  );
}
