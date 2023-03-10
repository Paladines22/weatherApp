import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader/Loader';

const WeatherInfoCard = ({ setConditionWeather }) => {
  const [weather, setWeather] = useState(null);
  const [condition, setCondition] = useState(true);
  const [keyWord, setKeyWord] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('El usuario acepto compartir su ubicacion');
      let latit = position.coords.latitude;
      let long = position.coords.longitude;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${long}&appid=069bee45dd61d81d07e65de2ad1d7ccb`,
        )
        .then((resp) => {
          setWeather(resp.data);
          const textWithSeparate = resp.data.weather[0].description
            .replace(' ', '-')
            .toLowerCase();
          setConditionWeather(textWithSeparate);
        })
        .catch((err) => console.log(err));
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyWord(e.target['keyword-input'].value);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${e.target['keyword-input'].value}&appid=069bee45dd61d81d07e65de2ad1d7ccb`,
      )
      .then((resp) => {
        setWeather(resp.data);
        setConditionWeather(
          resp.data.weather[0].description.replace(' ', '-').toLowerCase(),
        );
      })
      .catch((error) => console.error(error));
  };

  let celsius = '';
  function toCelsius(kelvin) {
    celsius = Math.floor(kelvin - 273.15);
    return celsius;
  }
  toCelsius(weather?.main.temp);

  let fahrenheit = '';
  function toFahrenheit(celsius) {
    fahrenheit = Math.floor(celsius * (9 / 5) + 32);
    return fahrenheit;
  }
  toFahrenheit(celsius);

  return (
    <div className="info-card">
      {!weather ? (
        <Loader />
      ) : (
        <section className="flex-col flex justify-around items-center">
          <div className="form-container">
            <form className="mt-10 " onSubmit={handleSubmit}>
              <input
                placeholder="search by city or country"
                type="search"
                id="keyword-input"
                className="text-black px-3 py-1.5 rounded-lg w-96 input"
              />
              <h3 className="text-white font-bold text-2xl pt-10 pl-16">
                📍 {weather?.name}, {weather?.sys.country}
              </h3>
            </form>
          </div>

          <section className="flex flex-wrap main-data-container">
            <div
              className="bg-slate-300/50 flex drop-shadow-xl justify-center  p-3 m-4 w-96 rounded-xl h-56"
              style={{ flexDirection: 'column' }}
            >
              <h2 className="text-white  text-xl pt-6 px-14" style={{ flex: 'none' }}>
                {weather?.weather[0].description}{' '}
              </h2>
              <div className="flex">
                <h2 className="text-gray text-8xl font-extralight ">
                  {condition ? celsius + '°C' : fahrenheit + '°F'}
                </h2>
                <img
                  className=""
                  src={`../../icons/${weather?.weather[0].icon}.png`}
                  alt="weather-icon"
                ></img>
              </div>
            </div>

            <div className=" h-50  m-10 info-container">
              <div className="bg-slate-300/50 rounded-lg flex border-y-1 shadow-lg shadow-w-500">
                <img src="../../icons/humidity.png" className="p-4" alt="" />
                <p className="text-white pt-4 pr-2 pl-4"> {weather?.main.humidity} %</p>
              </div>

              <div className="flex border-y-2 bg-slate-300/50 rounded-lg shadow-lg shadow-w-500">
                <img src="../../icons/wind.png" className="p-4" alt="" />
                <p className="text-white pt-4 pr-2"> {weather?.wind.speed} m/s</p>
              </div>

              <div className="flex border-y-1 bg-slate-300/50 rounded-lg shadow-lg shadow-w-500">
                <img src="../../icons/arrow.png" className="p-4" alt="" />{' '}
                <p className="text-white pt-4 pr-2">{weather?.main.pressure} hPa </p>
              </div>
            </div>
          </section>
          <button
            onClick={() => setCondition(!condition)}
            className="bg-blue-200 text-indigo-900 py-2 px-4 w-32 mt-8 hover:bg-sky-700 hover:drop-shadow-xl hover:text-white rounded-xl"
          >
            Cambiar a °F
          </button>
        </section>
      )}
    </div>
  );
};

export default WeatherInfoCard;
