import DailyForecast from './daily-forecast/DailyForecast';
import styles from './WeatherWeek.module.css';

export default function WeatherWeek({ weatherData, onDayClick }) {
  const dailyForecast = weatherData.forecast.forecastday.slice(1);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Daily Forecast</div>
      <div className={styles.dailyForecast}>
        {dailyForecast.map((weatherPerDay) => (
          <DailyForecast
            key={weatherPerDay.date_epoch}
            data={weatherPerDay}
            onDayClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
}

const weatherForecast = [
  {
    date: '2024-09-18',
    city: 'Elysium',
    country: 'Imaginaryland',
    temperature: 23,
    humidity: 65,
    windSpeed: 12,
    windDirection: 'NW',
    surfacePressure: 1015,
    precipitationProbability: 10,
    uvIndex: 6,
    visibility: 10,
    cloudCover: 20,
  },
  {
    date: '2024-09-19',
    city: 'Elysium',
    country: 'Imaginaryland',
    temperature: 25,
    humidity: 60,
    windSpeed: 10,
    windDirection: 'W',
    surfacePressure: 1018,
    precipitationProbability: 5,
    uvIndex: 7,
    visibility: 12,
    cloudCover: 15,
  },
  {
    date: '2024-09-20',
    city: 'Elysium',
    country: 'Imaginaryland',
    temperature: 26,
    humidity: 55,
    windSpeed: 8,
    windDirection: 'SW',
    surfacePressure: 1020,
    precipitationProbability: 0,
    uvIndex: 8,
    visibility: 14,
    cloudCover: 10,
  },
  {
    date: '2024-09-21',
    city: 'Elysium',
    country: 'Imaginaryland',
    temperature: 22,
    humidity: 70,
    windSpeed: 18,
    windDirection: 'N',
    surfacePressure: 1012,
    precipitationProbability: 40,
    uvIndex: 5,
    visibility: 8,
    cloudCover: 50,
  },
  {
    date: '2024-09-22',
    city: 'Elysium',
    country: 'Imaginaryland',
    temperature: 21,
    humidity: 75,
    windSpeed: 16,
    windDirection: 'NE',
    surfacePressure: 1010,
    precipitationProbability: 60,
    uvIndex: 4,
    visibility: 7,
    cloudCover: 65,
  },
  {
    date: '2024-09-23',
    city: 'Elysium',
    country: 'Imaginaryland',
    temperature: 19,
    humidity: 80,
    windSpeed: 20,
    windDirection: 'E',
    surfacePressure: 1008,
    precipitationProbability: 70,
    uvIndex: 3,
    visibility: 6,
    cloudCover: 85,
  },
  {
    date: '2024-09-24',
    city: 'Elysium',
    country: 'Imaginaryland',
    temperature: 17,
    humidity: 85,
    windSpeed: 22,
    windDirection: 'SE',
    surfacePressure: 1005,
    precipitationProbability: 80,
    uvIndex: 2,
    visibility: 5,
    cloudCover: 90,
  },
  {
    date: '2024-09-25',
    city: 'Elysium',
    country: 'Imaginaryland',
    temperature: 15,
    humidity: 90,
    windSpeed: 24,
    windDirection: 'S',
    surfacePressure: 1002,
    precipitationProbability: 90,
    uvIndex: 1,
    visibility: 4,
    cloudCover: 95,
  },
  {
    date: '2024-09-26',
    city: 'Elysium',
    country: 'Imaginaryland',
    temperature: 13,
    humidity: 95,
    windSpeed: 26,
    windDirection: 'SW',
    surfacePressure: 1000,
    precipitationProbability: 100,
    uvIndex: 0,
    visibility: 3,
    cloudCover: 100,
  },
];
