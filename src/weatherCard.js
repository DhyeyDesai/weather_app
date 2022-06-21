import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import axios from "axios";
import "./weatherCard.css";

const WeatherCard = () => {
  const getData = (location) => {
    setGettingData(true);
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=efc1034e953b4680b7c94105212909&q=${location}&aqi=yes`
      )
      .then((response) => {
        setHasError(false);
        const data = response.data;
        setLocationData(data);
        console.log(data);
        setDataReceived(true);
        setGettingData(false);
      })
      .catch((error) => {
        console.log(error.message);
        setHasError(true);
        setGettingData(false);
      });
  };

  useEffect(() => {
    getData("ahmedabad");
  }, []);

  const [location, setLocation] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [locationData, setLocationData] = useState({});
  const [dataReceived, setDataReceived] = useState(false);
  const [gettingData, setGettingData] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="card">
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Location"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              getData(inputValue);
            }
          }}
        ></input>
        <div
          className="search-button"
          type="submit"
          onClick={() => getData(inputValue)}
        >
          <GoSearch />
        </div>
      </div>
      {gettingData ? (
        <div className="weather-container loading"> Please Wait </div>
      ) : !hasError ? (
        <div className="weather-container">
          <div className="weather-container-top">
            <div className="location">
              {dataReceived && locationData.location.name}
            </div>
            <div className="state-country">
                {dataReceived && `${locationData.location.region}, ${locationData.location.country}`}
            </div>
          </div>
          <div className="weather-container-bottom">
            <div className="weather-container-left">
              <div className="temperature">
                {`Current Temperature: ${
                  dataReceived && locationData.current.temp_c
                }°C`}
              </div>
              <div className="feels_like">
                {`Feels like ${
                  dataReceived && locationData.current.feelslike_c
                }°C`}
              </div>
              <div className="wind_direction">
                {`Wind Direction ${
                  dataReceived && locationData.current.wind_dir
                }`}
              </div>
              <div className="wind_kph">
                {`Wind speed ${
                  dataReceived && locationData.current.wind_kph
                }km/h`}
              </div>
              <div className="humidity">
                {`Humidity ${dataReceived && locationData.current.humidity}%`}
              </div>
            </div>
            <div className="weather-container-right">
              {dataReceived && (
                <img src={locationData.current.condition.icon} />
              )}
              {dataReceived && locationData.current.condition.text}
            </div>
          </div>
        </div>
      ) : (
        <div className="weather-container loading">Please enter a correct location name.</div>
      )}
    </div>
  );
};

export default WeatherCard;
