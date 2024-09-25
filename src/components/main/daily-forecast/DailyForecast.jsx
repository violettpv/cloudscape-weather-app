import styles from './DailyForecast.module.css';
import { formatDate } from '@util';
import { useContext } from 'react';
import ModeContext from '@store/ModeContext';

export default function DailyForecast({ data, onDayClick }) {
  const modeCtx = useContext(ModeContext);
  const mode = modeCtx.mode;

  return (
    <div className={styles.container} onClick={() => onDayClick(data)}>
      <div className={styles.date}>{formatDate(data.date)}</div>
      <div className={styles.temperature}>
        {mode === 'metric' ? data.day.avgtemp_c : data.day.avgtemp_f}
        &deg; {mode === 'metric' ? 'C' : 'F'}
      </div>
      <div className={styles.icon}>
        <img src={data.day.condition.icon} alt={data.day.condition.text} />
      </div>
      <div className={styles.forecast}>
        <div>
          Min t&deg;: {mode === 'metric' ? data.day.mintemp_c : data.day.mintemp_f}
        </div>
        <div>
          Max t&deg;: {mode === 'metric' ? data.day.maxtemp_c : data.day.maxtemp_f}
        </div>
        <div>Humidity: </div>
        <div>UV: </div>
        <div>PoP: </div>
        <div>Wind direction: </div>
        <div>Wind speed: </div>
        <div>Visibility: </div>
        <div>Cloud cover: </div>
        <div>Surface pressure: </div>
      </div>
    </div>
  );
}
