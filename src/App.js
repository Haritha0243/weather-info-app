import React, { useState } from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiStrongWind,
  WiDayCloudy,
  WiSprinkle,
} from "react-icons/wi";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weather, setWeather] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedHour, setSelectedHour] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const weatherConditions = {
    0: { label: "Clear Sky", icon: <WiDaySunny /> },
    1: { label: "Mainly Clear", icon: <WiDayCloudy /> },
    2: { label: "Partly Cloudy", icon: <WiCloud /> },
    3: { label: "Overcast", icon: <WiCloud /> },
    45: { label: "Foggy", icon: <WiFog /> },
    51: { label: "Drizzle", icon: <WiSprinkle /> },
    61: { label: "Rainy", icon: <WiRain /> },
    71: { label: "Snowy", icon: <WiSnow /> },
    80: { label: "Showers", icon: <WiRain /> },
    95: { label: "Thunderstorm", icon: <WiThunderstorm /> },
  };

  const getWeather = async (latParam, lonParam) => {
    setError("");
    setWeather(null);
    setHourlyData([]);
    setLoading(true);

    try {
      let lat = latParam || latitude;
      let lon = lonParam || longitude;

      if (city && (!lat || !lon)) {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          setError("City not found!");
          setLoading(false);
          return;
        }

        lat = geoData.results[0].latitude;
        lon = geoData.results[0].longitude;
      }

      if (!lat || !lon) {
        setError("Please enter a city or coordinates!");
        setLoading(false);
        return;
      }

      // Fetch weather data
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,windspeed_10m,weathercode`
      );
      const weatherData = await weatherRes.json();

      const { temperature, windspeed, weathercode } =
        weatherData.current_weather;

      const condition =
        weatherConditions[weathercode] || {
          label: "Unknown",
          icon: <WiStrongWind />,
        };

      setWeather({
        location: city
          ? city
          : `Lat: ${parseFloat(lat).toFixed(2)}, Lon: ${parseFloat(lon).toFixed(
              2
            )}`,
        temperature,
        windspeed,
        condition,
      });
      const now = new Date();
      const hours = weatherData.hourly.time
        .map((t, i) => ({
          time: new Date(t),
          temperature: weatherData.hourly.temperature_2m[i],
          windspeed: weatherData.hourly.windspeed_10m[i],
          weathercode: weatherData.hourly.weathercode[i],
        }))
        .filter((h) => h.time > now)
        .slice(0, 12);

      setHourlyData(hours);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setError("");
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);
        getWeather(lat, lon);
      },
      () => {
        setError("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  };

  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
  };

  return (
    <div className="app">
      <h1>🌦️ Weather Now</h1>

      <div className="inputs">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <div className="latlon">
          <input
            type="number"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="number"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button onClick={() => getWeather()}>Get Weather</button>
          <button className="location-btn" onClick={handleUseMyLocation}>
            📍 Use My Location
          </button>
        </div>
      </div>

      {loading && <p>Loading weather...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <>
          <div className="result">
            <h2>{weather.location}</h2>
            <div className="icon">{weather.condition.icon}</div>
            <p>{weather.condition.label}</p>
            <p>🌡️ {weather.temperature}°C</p>
            <p>💨 {weather.windspeed} km/h</p>
          </div>

          {/* Hourly Forecast Section */}
          {hourlyData.length > 0 && (
            <>
              <h3>Next 12 Hours Forecast</h3>
              <div className="hourly-grid">
                {hourlyData.map((h, i) => {
                  const cond =
                    weatherConditions[h.weathercode] || weatherConditions[0];
                  const dateStr = h.time.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  const dayStr = h.time.toLocaleDateString("en-GB", {
                    weekday: "long",
                  });
                  const timeStr = h.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });

                  return (
                    <div key={i} className="hour-card">
                      <p><b>{dayStr}</b></p>
                      <p>{dateStr}</p>
                      <p>{timeStr}</p>
                      <div className="hour-icon">{cond.icon}</div>
                      <p>{cond.label}</p>
                      <p>🌡️ {h.temperature}°C</p>
                      <p>💨 {h.windspeed} km/h</p>
                    </div>
                  );
                })}
              </div>

              <h3>Check Weather by Hour</h3>
              <select onChange={handleHourChange}>
                <option value="">Select Hour</option>
                {hourlyData.map((h, i) => {
                  const dateStr = h.time.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  });
                  const dayStr = h.time.toLocaleDateString("en-GB", {
                    weekday: "short",
                  });
                  const timeStr = h.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });
                  return (
                    <option key={i} value={i}>
                      {`${dayStr}, ${dateStr} - ${timeStr}`}
                    </option>
                  );
                })}
              </select>

              {selectedHour !== "" && (
                <div className="result">
                  <h3>Weather at Selected Hour</h3>
                  <p>
                    🗓️{" "}
                    {hourlyData[selectedHour].time.toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    🕒{" "}
                    {hourlyData[selectedHour].time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                  <p>
                    🌡️ {hourlyData[selectedHour].temperature}°C | 💨{" "}
                    {hourlyData[selectedHour].windspeed} km/h
                  </p>
                  <p>
                    {
                      weatherConditions[hourlyData[selectedHour].weathercode]
                        ?.label
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
