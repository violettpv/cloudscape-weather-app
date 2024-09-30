import './index.css';
import { useState, useEffect } from 'react';
import WeatherToday from '@components/main/WeatherToday';
import WeatherWeek from '@components/main/WeatherWeek';
import { ModeContextProvider } from '@store/ModeContext';
import { SavedCitiesProvider } from '@store/SavedCitiesContext';
import { getWeatherByLocation, getWeatherByCity } from '@services/http';
import DUMMY_DATA from './test.json';
import StartPage from '@components/UI/StartPage';
import Loader from '@components/UI/Loader';
import MainPage from './MainPage';

async function fetchLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, (error) => {
      if (error.code === 1) {
        reject('User denied Geolocation');
      } else {
        reject(error);
      }
    });
  });
}

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDayWeather, setSelectedDayWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationBlocked, setLocationBlocked] = useState(false);

  // Using DUMMY_DATA for testing
  useEffect(() => {
    setWeatherData(DUMMY_DATA);
    setSelectedDayWeather(DUMMY_DATA.forecast?.forecastday[0]);
  }, []);

  const handleCitySearch = async (city) => {
    console.log('handleCitySearch:', city);
    try {
      setLoading(true);
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      setSelectedDayWeather(data.forecast.forecastday[0]);
      setLocationBlocked(false);
    } catch (err) {
      // Failed to fetch weather data for the entered city.
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Avoiding error if geolocation denied + for testing DUMMY_DATA
  if (!weatherData || !selectedDayWeather) {
    return <div>No weather data available</div>;
  }

  const locationData = weatherData?.location;
  const currentWeatherData = weatherData?.current;

  return (
    <ModeContextProvider>
      <SavedCitiesProvider>
        <MainPage onSearch={handleCitySearch}>
          <WeatherToday
            locationData={locationData}
            currentWeather={currentWeatherData}
            weatherData={selectedDayWeather}
          />
          <WeatherWeek weatherData={weatherData} onDayClick={setSelectedDayWeather} />
        </MainPage>
      </SavedCitiesProvider>
    </ModeContextProvider>
  );
}
