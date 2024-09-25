import styles from './HourlyData.module.css';

export default function HourlyData({
  time,
  icon,
  temperature,
  tempSymbol,
  uv,
  precipitationProbability,
  popUnit,
  windSpeed,
  windUnit,
  windDirection,
  humidity,
  pressure,
  pressureUnit,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.time}>{time}</div>
        <div className={styles.weatherIcon}>
          <img src={icon} alt="weather icon" />
        </div>
        <div className={styles.temperature}>
          {temperature}&deg;{tempSymbol}
        </div>
        <div>Humidity: {humidity}%</div>
        <div>
          Pressure: {pressure} {pressureUnit}
        </div>
        <div>
          Wind speed: {windSpeed} {windUnit}
        </div>
        <div>Wind direction: {windDirection}&deg;</div>
        <div>
          Precipitation: {precipitationProbability} {popUnit}
        </div>
        <div>UV: {uv}</div>
      </div>
    </div>
  );
}
