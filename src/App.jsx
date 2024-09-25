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
import Loading from './components/UI/Loading';

async function fetchLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDayWeather, setSelectedDayWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationBlocked, setLocationBlocked] = useState(false);

  // Using DUMMY_DATA for testing
  useEffect(() => {
    setWeatherData(DUMMY_DATA);
    setSelectedDayWeather(DUMMY_DATA.forecast?.forecastday[0]);
  }, []);

  // useEffect(() => {
  //   async function fetchWeather() {
  //     try {
  //       const position = await fetchLocation();
  //       const data = await getWeatherByLocation(
  //         position.coords.latitude,
  //         position.coords.longitude
  //       );
  //       setWeatherData(data);
  //       setSelectedDayWeather(data.forecast.forecastday[0]); // today's weather is default
  //     } catch (err) {
  //       setError('Failed to fetch weather data or geolocation.');
  //       // console.error(err);
  //       setLocationBlocked(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchWeather();
  // }, []);

  // if (loading) {
  //   return <div>Loading weather data...</div>;
  // }
  // if (error) {
  //   return <div>{error}</div>;
  // }

  // Needed for testing to avoid error when weatherData is null or undefined
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
            <SearchBar />
            <ToggleSwitch />
            <GuideButton />
          </div>
        </header>
        <main className={styles.main}>
          {/* {loading || locationBlocked || !weatherData || !selectedDayWeather ? (
            <Loading />
          ) : (
            <>
              <WeatherToday
                locationData={locationData}
                currentWeather={currentWeatherData}
                weatherData={selectedDayWeather}
              />
              <WeatherWeek weatherData={weatherData} onDayClick={setSelectedDayWeather} />
            </>
          )} */}

          <WeatherToday
            locationData={locationData}
            currentWeather={currentWeatherData}
            weatherData={selectedDayWeather}
          />
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
