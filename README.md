# weather-app
# weather-app
# 🌤️ WeatherNow – Real-Time Weather Forecast App

## 📋 Overview

**WeatherNow** is a React-based web application that allows users to quickly check current weather conditions for any city or location (via latitude and longitude).
It uses the **Open-Meteo API** to provide **real-time temperature, wind speed, and weather forecasts** for the next 12 hours, displayed in an intuitive and user-friendly interface.

## 🚀 Features

✅ **Search by City** – Enter any city name to get instant weather data.
✅ **Search by Coordinates** – Enter latitude and longitude manually.
✅ **Use My Location** – Detects and displays weather for your current location.
✅ **Next 12-Hour Forecast** – Displays temperature, wind speed, and weather condition (sunny, cloudy, etc.).
✅ **Time-Based Dropdown** – Choose a specific time to view its forecast.
✅ **Readable Date & Time** – Each entry shows date, day, and time in **12-hour (AM/PM)** format for user clarity.
✅ **Responsive UI** – Works smoothly on desktop and mobile browsers.

---

## 🛠️ Tech Stack

* **Frontend:** React (Create React App)
* **Styling:** CSS (custom layout with grid & flexbox)
* **Icons:** Unicode weather symbols ☀️🌧️🌤️🌩️
* **API:** [Open-Meteo API](https://open-meteo.com/)
* **Browser Feature:** HTML Geolocation API (for current location)

---

## 🧩 API Integration

The app uses the **Open-Meteo Free Weather API**, which provides:

* Real-time temperature (`temperature_2m`)
* Wind speed (`windspeed_10m`)
* Weather code (`weathercode`)
* Hourly time-series forecast data

**API Endpoint Example:**

```
https://api.open-meteo.com/v1/forecast?latitude=12.97&longitude=77.59&current_weather=true&hourly=temperature_2m,windspeed_10m,weathercode
```

---

## 🕒 Why 12-Hour Time Format?

The **12-hour AM/PM format** was chosen to:

1. Improve readability for general users (especially non-technical or casual users like Jamie).
2. Provide an intuitive understanding of the day’s timeline (e.g., “2:00 PM” is clearer than “14:00”).
3. Align with most weather apps’ UX conventions for broader familiarity.

This enhances **user experience** by making forecast times instantly recognizable and reducing confusion during planning for outdoor activities.


## 🧭 How It Works

1. User enters a city name or latitude/longitude.
2. The app fetches weather data from the **Open-Meteo API**.
3. Displays:

   * Current weather (temperature, wind, condition)
   * Next 12-hour forecast (hourly details)
   * Dropdown for selecting a specific hour’s weather
4. If “Use My Location” is clicked, the **browser’s geolocation** automatically fills coordinates.

---

## 📱 UI Preview

**Main Components:**

* Search Input (City or Lat/Long)
* Current Weather Display
* Next 12-Hour Forecast Cards (with Date, Day & Time)
* Time Selector Dropdown
* Detailed View of Selected Hour

---

## 🧠 Learning Highlights

Through this project, key React and API integration concepts were practiced:

* **useState** & **useEffect** hooks for data fetching and rendering
* **Conditional Rendering** for UI updates
* **Fetch API** for async HTTP requests
* **Data Formatting** using JavaScript’s `Date` object
* **Error handling** for invalid city or coordinate inputs

---

## 🔗 Live Demo

🌍 [View on StackBlitz](https://stackblitz.com/~/github.com/Haritha0243/weather-info-app)



**Developed by:** Haritha P.
**Powered by:** React ⚛️ + Open-Meteo API 🌦️


