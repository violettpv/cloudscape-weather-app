import styles from './App.module.css';
import './index.css';
import { useState, useEffect } from 'react';
import SearchBar from '@components/header/SearchBar';
import GuideButton from '@components/header/GuideButton';
import WeatherToday from '@components/main/WeatherToday';
import WeatherWeek from '@components/main/WeatherWeek';
import Credits from '@components/footer/Credits';
import { ModeContextProvider } from '@store/ModeContext';
import ToggleSwitch from '@components/UI/ToggleSwitch';
import { getWeatherByLocation, getWeatherByCity } from '@services/http';
import DUMMY_DATA from './test.json';
import StartPage from '@components/UI/StartPage';
import Loader from '@components/UI/Loader';

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
  // useEffect(() => {
  //   setWeatherData(DUMMY_DATA);
  //   setSelectedDayWeather(DUMMY_DATA.forecast?.forecastday[0]);
  // }, []);

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
          console.log('Geolocation denied.', err);
          setLocationBlocked(true);
        } else {
          setError('Failed to fetch weather data or geolocation.');
          // setLocationBlocked(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  const handleCitySearch = async (city) => {
    try {
      setLoading(true);
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      setSelectedDayWeather(data.forecast.forecastday[0]);
    } catch (err) {
      // Failed to fetch weather data for the entered city.
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Avoiding error if geolocation denied
  if (!weatherData || !selectedDayWeather) {
    return <div>No weather data available</div>;
  }

  const locationData = weatherData?.location;
  const currentWeatherData = weatherData?.current;

  return (
    <ModeContextProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h3 className={styles.title}>Cloudscape</h3>
          </div>
          <div className={styles.menu}>
            <SearchBar onSearch={handleCitySearch} />
            <ToggleSwitch />
            <GuideButton />
          </div>
        </header>

        <main className={styles.main}>
          {(!weatherData || !selectedDayWeather || locationBlocked) && <StartPage />}

          {loading ? (
            <Loader />
          ) : (
            <>
              <WeatherToday
                locationData={locationData}
                currentWeather={currentWeatherData}
                weatherData={selectedDayWeather}
              />
              <WeatherWeek weatherData={weatherData} onDayClick={setSelectedDayWeather} />
            </>
          )}

          <div>Saved cities</div>
        </main>

        <footer className={styles.footer}>
          <Credits />
        </footer>
      </div>
    </ModeContextProvider>
  );
}
