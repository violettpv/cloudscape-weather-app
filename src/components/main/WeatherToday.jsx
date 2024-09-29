import styles from '@css/WeatherToday.module.css';
import ForecastTable from './ForecastTable';
import HourlyForecast from './hourly-forecast/HourlyForecast';
import { formatDate } from '@services/utils';
import { useContext, useEffect, useState } from 'react';
import ModeContext from '@store/ModeContext';
import SavedCitiesContext from '@store/SavedCitiesContext';

export default function WeatherToday({ locationData, currentWeather, weatherData }) {
  const modeCtx = useContext(ModeContext);
  const mode = modeCtx.mode;

  const { savedCities, addCity, removeCity } = useContext(SavedCitiesContext);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const cityExists = savedCities.some(
      (city) => city.name === locationData?.name && city.country === locationData?.country
    );
    setIsSaved(cityExists);
  }, [locationData, savedCities]);

  const saveCityHandler = () => {
    if (isSaved) {
      removeCity({ name: locationData?.name, country: locationData?.country });
    } else {
      const success = addCity({
        name: locationData?.name,
        country: locationData?.country,
      });
      if (!success) {
        alert('You can only save up to 5 cities.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.weatherNowContainer}>
        <div className={styles.currDate}>
          <span>{formatDate(locationData?.localtime)}</span>
        </div>
        <div className={styles.location}>
          <span>
            {locationData?.name}, {locationData?.country}
          </span>
        </div>
        <div className={styles.weatherIcon}>
          <img src={currentWeather?.condition.icon} alt="weather icon" />
        </div>
        <div className={styles.weatherDesc}>
          <span>{currentWeather?.condition.text}</span>
        </div>
        <div className={styles.currTemperature}>
          <span>
            {mode === 'metric' ? currentWeather?.temp_c : currentWeather?.temp_f}
          </span>
          <span>&deg; {mode === 'metric' ? 'C' : 'F'}</span>
        </div>

        <div className={styles.tableContainer}>
          <ForecastTable data={currentWeather} />
        </div>

        <button className={styles.saveButton} onClick={saveCityHandler}>
          {isSaved ? 'Unsave city' : 'Save city'}
        </button>
      </div>
      <div className={styles.separator}></div>
      <hr className={styles.separatorHorz}></hr>
      <div className={styles.weatherHourlyContainer}>
        <HourlyForecast data={weatherData} />
      </div>
    </div>
  );
}
