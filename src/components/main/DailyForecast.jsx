import styles from '@css/DailyForecast.module.css';
import { formatDate } from '@services/utils';
import { useContext } from 'react';
import ModeContext from '@store/ModeContext';

export default function DailyForecast({ data, onDayClick }) {
  const modeCtx = useContext(ModeContext);
  const mode = modeCtx.mode;
  const formattedDate = formatDate(data.date);

  return (
    <div
      className={styles.container}
      onClick={() => {
        onDayClick(data);
      }}
    >
      <div className={styles.date}>
        <p>{formattedDate.split(',')[0]}</p>
        <p>{formattedDate.split(',')[1]}</p>
      </div>
      <div className={styles.temperature}>
        {mode === 'metric' ? data.day.avgtemp_c : data.day.avgtemp_f}
        &deg; {mode === 'metric' ? 'C' : 'F'}
      </div>
      <div className={styles.icon}>
        <img src={data.day.condition.icon} alt={data.day.condition.text} />
      </div>
      <div className={styles.forecast}>
        <div className={styles.dataTableColumn}>
          <div>Min/Max t&deg;:</div>
          <div>Humidity:</div>
          <div>Max wind speed:</div>
          <div>Precipitation:</div>
          <div>Visibility:</div>
          <div>UV:</div>
        </div>
        <div className={styles.dataTableColumn}>
          <div>
            {mode === 'metric' ? data.day.mintemp_c : data.day.mintemp_f}
            &deg; / {mode === 'metric' ? data.day.maxtemp_c : data.day.maxtemp_f}
            &deg; {mode === 'metric' ? 'C' : 'F'}
          </div>
          <div>{data.day.avghumidity} %</div>
          <div>
            {mode === 'metric' ? data.day.maxwind_kph : data.day.maxwind_mph}{' '}
            {mode === 'metric' ? 'kph' : 'mph'}
          </div>
          <div>
            {mode === 'metric' ? data.day.totalprecip_mm : data.day.totalprecip_in}{' '}
            {mode === 'metric' ? 'mm' : 'in'}
          </div>
          <div>
            {mode === 'metric' ? data.day.avgvis_km : data.day.avgvis_miles}{' '}
            {mode === 'metric' ? 'km' : 'miles'}
          </div>
          <div>{data.day.uv}</div>
        </div>
      </div>
    </div>
  );
}
