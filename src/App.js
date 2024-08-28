import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  function updateWeather(response) {
    setWeather({
      temperature: response.data.main.temp,
      cityName: response.data.name,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function submitForm(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6643c7326a4c2a38838264a28531d97e&units=metric`;
    axios.get(url).then(updateWeather);
  }

  function displayCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={submitForm} className="SearchBar">
      <input
        type="text"
        placeholder="Enter a city.."
        onChange={displayCity}
        className="textSubmit"
      />
      <input type="submit" value="Search" className="searchButton" />
    </form>
  );

  if (city.length > 1) {
    return (
      <div className="weatherBody">
        <div>{form}</div>
        <ul className="WeatherDetails">
          <li className="current-temperature-value">
            {Math.round(weather.temperature)}
            <span className="current-temperature-unit">°C</span>
            <div className="current-city">{weather.cityName}</div>
          </li>
          <div className="grid">
            <div className="grid-column-two">
              <li className="current-details">
                Description: <strong>{weather.description}</strong>
              </li>
              <li className="current-details">
                Humidity: <strong>{weather.humidity}%</strong>
              </li>
              <li className="current-details">
                Wind: <strong>{weather.wind}km/h</strong>
              </li>
            </div>
            <li>
              <img
                src={weather.icon}
                alt={weather.description}
                className="weather-icon"
              />
            </li>
          </div>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <div>{form}</div>
        <p className="SearchBar">
          <em>please enter a city for weather stats in that area!</em>
        </p>
      </div>
    );
  }
}

