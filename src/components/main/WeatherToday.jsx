import styles from './WeatherToday.module.css';
import ForecastTable from './forecast-table/ForecastTable';
import HourlyForecast from './hourly-forecast/HourlyForecast';
import { formatDate } from '@util';
import { useContext } from 'react';
import ModeContext from '@store/ModeContext';

export default function WeatherToday({ locationData, currentWeather, weatherData }) {
  const modeCtx = useContext(ModeContext);
  const mode = modeCtx.mode;

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
      </div>
      <div className={styles.separator}></div>
      <hr className={styles.separatorHorz}></hr>
      <div className={styles.weatherHourlyContainer}>
        <HourlyForecast data={weatherData} />
      </div>
    </div>
  );
}
