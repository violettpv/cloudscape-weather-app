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
import { getWeatherByLocation } from '@services/http';
import DUMMY_DATA from './test.json';

async function fetchLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export default function App() {
  const [selectedDayWeather, setSelectedDayWeather] = useState(null);
  // const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const weatherData = DUMMY_DATA;

  // useEffect(() => {
  //   async function fetchWeather() {
  //     try {
  //       const position = await fetchLocation();

  //       const data = await getWeatherByLocation(
  //         position.coords.latitude,
  //         position.coords.longitude
  //       );
  //       setWeatherData(data);
  //     } catch (err) {
  //       setError('Failed to fetch weather data or geolocation.');
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchWeather();
  // }, []);

  useEffect(() => {
    if (weatherData) {
      setSelectedDayWeather(weatherData.forecast.forecastday[0]);
    }
  }, [weatherData]);

  // if (loading) {
  //   return <div>Loading weather data...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  return (
    <ModeContextProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h3 className={styles.title}>Cloudscape</h3>
          </div>
          <div className={styles.menu}>
            <SearchBar />
            <ToggleSwitch />
            <GuideButton />
          </div>
        </header>
        <main className={styles.main}>
          <WeatherToday weatherData={weatherData} />
          <WeatherWeek weatherData={weatherData} onDayClick={setSelectedDayWeather} />
          <div>Saved cities</div>
        </main>
        <footer className={styles.footer}>
          <Credits />
        </footer>
      </div>
    </ModeContextProvider>
  );
}
