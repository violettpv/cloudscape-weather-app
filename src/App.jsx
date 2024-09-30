import './index.css';
import { useState, useEffect } from 'react';
import WeatherToday from '@components/main/WeatherToday';
import WeatherWeek from '@components/main/WeatherWeek';
import { ModeContextProvider } from '@store/ModeContext';
import { SavedCitiesProvider } from '@store/SavedCitiesContext';
import { getWeatherByLocation, getWeatherByCity } from '@services/http';
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

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        const position = await fetchLocation();
        const data = await getWeatherByLocation(
          position.coords.latitude,
          position.coords.longitude
        );
        setWeatherData(data);
        setSelectedDayWeather(data.forecast.forecastday[0]); // today's weather is default
      } catch (err) {
        if (err === 'User denied Geolocation') {
          console.log(err);
          setLocationBlocked(true);
        } else {
          setError('Failed to fetch weather data or geolocation.');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
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

  const locationData = weatherData?.location;
  const currentWeatherData = weatherData?.current;

  return (
    <ModeContextProvider>
      <SavedCitiesProvider>
        <MainPage onSearch={handleCitySearch}>
          {loading && <Loader />}
          {!weatherData && locationBlocked && <StartPage />}
          {weatherData && selectedDayWeather && !loading && (
            <>
              <WeatherToday
                locationData={locationData}
                currentWeather={currentWeatherData}
                weatherData={selectedDayWeather}
              />
              <WeatherWeek weatherData={weatherData} onDayClick={setSelectedDayWeather} />
            </>
          )}
        </MainPage>
      </SavedCitiesProvider>
    </ModeContextProvider>
  );
}
