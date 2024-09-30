import DailyForecast from './DailyForecast';
import styles from '@css/WeatherWeek.module.css';

export default function WeatherWeek({ weatherData, onDayClick }) {
  const dailyForecast = weatherData.forecast.forecastday;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Daily Forecast</div>
      <div className={styles.dailyForecast}>
        {dailyForecast.map((weatherPerDay) => (
          <div key={weatherPerDay.date_epoch}>
            <DailyForecast data={weatherPerDay} onDayClick={onDayClick} />
          </div>
        ))}
      </div>
    </div>
  );
}
