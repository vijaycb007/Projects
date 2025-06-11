import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/Searchbar";
import WeatherCard from "./components/Weathercard";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [currentVideo, setCurrentVideo] = useState("/videos/clear.mp4");
  const [nextVideo, setNextVideo] = useState(null);
  const [fadeTransition, setFadeTransition] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const videoRef = useRef(null);
  const preloadVideoRef = useRef(null);

  const API_KEY = "0473f30693d5e3571c709377fe86615f";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      setWeather({
        name: data.name,
        country: data.sys.country,
        main: {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
        },
        weather: [
          {
            main: data.weather[0].description,
            icon: data.weather[0].icon,
          },
        ],
        wind: { speed: data.wind.speed },
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone,
      });

      setCity("");
    } catch (error) {
      alert(error.message);
      setWeather(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  const getVideoForWeather = () => {
    if (!weather) return "/videos/clear.mp4";

    const condition = weather.weather[0].main.toLowerCase();

    if (condition.includes("cloud")) return "/videos/clouds.mp4";
    if (condition.includes("rain")) return "/videos/rain.mp4";
    if (condition.includes("clear")) return "/videos/clear.mp4";
    if (condition.includes("snow")) return "/videos/snow.mp4";
    if (condition.includes("storm") || condition.includes("thunder"))
      return "/videos/storm.mp4";
    if (condition.includes("mist") || condition.includes("fog"))
      return "/videos/mist.mp4";

    return "/videos/clear.mp4";
  };

  useEffect(() => {
    if (!weather) return;

    const newVideo = getVideoForWeather();

    if (newVideo === currentVideo) return; // prevent same video reload

    // preload next video
    preloadVideoRef.current.src = newVideo;
    preloadVideoRef.current.load();

    preloadVideoRef.current.oncanplaythrough = () => {
      setNextVideo(newVideo);
      setFadeTransition(true);

      setTimeout(() => {
        setCurrentVideo(newVideo);
        setFadeTransition(false);
        setNextVideo(null);
      }, 1000); // match transition duration
    };
  }, [weather]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full z-[-3]"
        style={{
          backgroundImage: "url('/videos/2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Current video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
        src={currentVideo}
      />

      {/* Preload & transition video */}
      {nextVideo && (
        <video
          autoPlay
          loop
          muted
          className={`absolute top-0 left-0 w-full h-full object-cover z-[-1] transition-opacity duration-1000 ${
            fadeTransition ? "opacity-100" : "opacity-0"
          }`}
          src={nextVideo}
        />
      )}

      {/* Hidden preloading video element */}
      <video ref={preloadVideoRef} style={{ display: "none" }} />

      <div className="bg-white bg-opacity-25 backdrop-blur-md rounded-[2rem] shadow-2xl p-8 sm:p-10 w-[90%] max-w-[400px] transition-transform transform hover:scale-105 border border-white border-opacity-30">
        <h1 className="text-4xl font-bold text-blue-400/60 mb-8 drop-shadow-xl text-center">
          SkyCast ⛅
        </h1>

        <SearchBar
          city={city}
          setCity={setCity}
          getWeather={getWeather}
          handleKeyPress={handleKeyPress}
        />

        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
