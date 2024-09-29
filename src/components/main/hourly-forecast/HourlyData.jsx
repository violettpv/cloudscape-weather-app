import styles from '@css/HourlyData.module.css';

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
        <div className={styles.forecastTable}>
          <div className={styles.forecastColumn}>
            <div>Humidity</div>
            <div>Pressure</div>
            <div>Wind speed</div>
            <div>Wind direction</div>
            <div>Precipitation</div>
            <div>UV</div>
          </div>
          <div className={styles.forecastColumn}>
            <div>{humidity} %</div>
            <div>
              {pressure} {pressureUnit}
            </div>
            <div>
              {windSpeed} {windUnit}
            </div>
            <div>{windDirection}&deg;</div>
            <div>
              {precipitationProbability} {popUnit}
            </div>
            <div>{uv}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
