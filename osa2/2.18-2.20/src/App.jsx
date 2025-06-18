import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [findName, setFindName] = useState('');

  const handleFindNameChange = (event) => {
    const input = event.target.value;
    setFindName(input);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  useEffect(() => {
    const getCountries = async () => {
      const response = await axios.get(
        'https://studies.cs.helsinki.fi/restcountries/api/all'
      );
      setCountries(response.data);
    };
    getCountries();
  }, []);

  return (
    <div>
      Find countries: <input value={findName} onChange={handleFindNameChange} />
      <Countries
        countries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </div>
  );
};

const Countries = ({ countries, setFilteredCountries }) => {
  function jumpToCountry(country) {
    setFilteredCountries([country]);
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify the filter further.</p>;
  }
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => jumpToCountry(country)}>Show</button>
          </div>
        ))}
      </div>
    );
  }
  if (countries.length === 1) {
    return (
      <div>
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital {countries[0].capital}</p>
          <p>Area {countries[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(countries[0].languages).map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
          <img src={countries[0].flags.png} alt="" />
        </div>
        <div>
          <Weather city={countries[0].capital} />
        </div>
      </div>
    );
  }
};

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await axios.get(`https://wttr.in/${city}?format=j1`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    getWeather();
  }, [city]);

  if (!weatherData) {
    return <div>Loading weather...</div>;
  }

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature {weatherData.current_condition[0].temp_C} Celsius</p>
      <p>{weatherData.current_condition[0].weatherDesc[0].value}</p>
      <p>
        Wind {(weatherData.current_condition[0].windspeedKmph / 3.6).toFixed(1)}{' '}
        m/s
      </p>
    </div>
  );
};

export default App;
