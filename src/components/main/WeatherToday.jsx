import styles from './WeatherToday.module.css';
import ForecastTable from './forecast-table/ForecastTable';
import HourlyForecast from './hourly-forecast/HourlyForecast';
import { formatDate } from '@util';
import { useContext } from 'react';
import ModeContext from '@store/ModeContext';

export default function WeatherToday({ weatherData }) {
  const modeCtx = useContext(ModeContext);
  const mode = modeCtx.mode;

  return (
    <div className={styles.container}>
      <div className={styles.weatherNowContainer}>
        <div className={styles.currDate}>
          <span>{formatDate(weatherData?.location.localtime)}</span>
        </div>
        <div className={styles.location}>
          <span>
            {weatherData?.location.name}, {weatherData?.location.country}
          </span>
        </div>
        <div className={styles.weatherIcon}>
          <img src={weatherData?.current.condition.icon} alt="weather icon" />
        </div>
        <div className={styles.weatherDesc}>
          <span>{weatherData?.current.condition.text}</span>
        </div>
        <div className={styles.currTemperature}>
          <span>
            {mode === 'metric'
              ? weatherData?.current.temp_c
              : weatherData?.current.temp_f}
          </span>
          <span>&deg; {mode === 'metric' ? 'C' : 'F'}</span>
        </div>
        <div className={styles.tableContainer}>
          <ForecastTable data={weatherData} />
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
