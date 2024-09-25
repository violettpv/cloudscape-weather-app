import styles from './ForecastTable.module.css';
import { useContext } from 'react';
import ModeContext from '@store/ModeContext';

export default function ForecastTable({ data }) {
  const modeCtx = useContext(ModeContext);
  const mode = modeCtx.mode;

  if (!data) {
    // Optionally, return a loading state while data is being fetched
    return <div className={styles.loadingDiv}>Loading...</div>;
  }

  const {
    wind_mph,
    wind_kph,
    wind_degree,
    pressure_mb,
    pressure_in,
    precip_mm,
    precip_in,
    humidity,
    uv,
    vis_km,
    vis_miles,
    cloud,
  } = data;

  return (
    <div className={styles.table}>
      <div className={styles.row}>
        <div className={styles.cell}>Humidity</div>
        <div className={styles.cell}>
          <span>{humidity}</span> %
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}>Wind speed</div>
        <div className={styles.cell}>
          <span>{mode === 'metric' ? wind_kph : wind_mph}</span>{' '}
          {mode === 'metric' ? 'k/ph' : 'm/ph'}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}>Wind direction</div>
        <div className={styles.cell}>
          <span>{wind_degree}</span> &deg;
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}>Surface pressure level</div>
        <div className={styles.cell}>
          <span>{mode === 'metric' ? pressure_mb : pressure_in}</span>{' '}
          {mode === 'metric' ? 'mb' : 'in'}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}>Precipitation probability</div>
        <div className={styles.cell}>
          <span>{mode === 'metric' ? precip_mm : precip_in}</span>{' '}
          {mode === 'metric' ? 'mm' : 'in'}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}>UV Index:</div>
        <div className={styles.cell}>{uv}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}>Visibility</div>
        <div className={styles.cell}>
          <span>{mode === 'metric' ? vis_km : vis_miles}</span>{' '}
          {mode === 'metric' ? 'km' : 'miles'}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}>Cloud cover</div>
        <div className={styles.cell}>
          <span>{cloud}</span> %
        </div>
      </div>
    </div>
  );
}
