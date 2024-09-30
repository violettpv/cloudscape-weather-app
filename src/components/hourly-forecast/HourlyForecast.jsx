import styles from '@css/HourlyForecast.module.css';
import HourlyData from './HourlyData';
import { WiSunset, WiSunrise } from 'react-icons/wi';
import { useContext, useEffect, useRef } from 'react';
import ModeContext from '@store/ModeContext';
import { convertTo24Hour, formatDate } from '@services/utils';

export default function HourlyForecast({ data }) {
  const modeCtx = useContext(ModeContext);
  const mode = modeCtx.mode;

  const hourlyData = data?.hour;

  const forecastContainerRef = useRef(null);
  const currentHourRef = useRef(null);
  const currentHour = new Date().getHours();
  const today = new Date().toISOString().split('T')[0]; // today's date in YYYY-MM-DD format

  useEffect(() => {
    const isToday = data.date === today;
    const forecastContainer = forecastContainerRef.current;

    if (forecastContainer) {
      let scrollOffset = 0;

      if (isToday && currentHourRef.current) {
        // today => scroll to the current hour
        const currentHourElement = currentHourRef.current;
        scrollOffset = currentHourElement.offsetLeft - forecastContainer.offsetLeft;
      } else {
        // scroll to the start (00:00)
        scrollOffset = 0;
      }

      forecastContainer.scrollTo({
        left: scrollOffset, // scroll to the calculated position
        behavior: 'smooth',
      });
    }
  }, [hourlyData, data.date, today]);

  if (!data) {
    return <div>Loading hourly forecast...</div>;
  }

  if (!hourlyData.length) {
    return <div>No hourly data available for today</div>;
  }

  const dateElementText = (date) => {
    const dateObj = new Date(date);
    if (dateObj.getDate() === new Date().getDate()) {
      return 'today';
    } else if (dateObj.getDate() === new Date().getDate() + 1) {
      return 'tomorrow';
    } else {
      return formatDate(date);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <p>Hourly forecast for {dateElementText(data.date)}</p>
      </div>

      <div className={styles.sun}>
        <div>
          <WiSunrise className={styles.icon} />
          <span>
            {mode === 'metric' ? convertTo24Hour(data.astro.sunrise) : data.astro.sunrise}
          </span>
        </div>
        <div>
          <WiSunset className={styles.icon} />
          <span>
            {mode === 'metric' ? convertTo24Hour(data.astro.sunset) : data.astro.sunset}
          </span>
        </div>
      </div>

      <div className={styles.forecast} ref={forecastContainerRef}>
        {hourlyData.map((hourly) => (
          <div
            key={hourly.time_epoch}
            ref={
              currentHour === new Date(hourly.time).getHours() && data.date === today
                ? currentHourRef
                : null
            }
          >
            <HourlyData
              time={hourly.time.slice(11, 16)}
              icon={hourly.condition.icon}
              temperature={mode === 'metric' ? hourly.temp_c : hourly.temp_f}
              tempSymbol={mode === 'metric' ? 'C' : 'F'}
              uv={hourly.uv}
              humidity={hourly.humidity}
              precipitationProbability={
                mode === 'metric' ? hourly.precip_mm : hourly.precip_in
              }
              popUnit={mode === 'metric' ? 'mm' : 'in'}
              windSpeed={mode === 'metric' ? hourly.wind_kph : hourly.wind_mph}
              windUnit={mode === 'metric' ? 'kph' : 'mph'}
              windDirection={hourly.wind_degree}
              pressure={mode === 'metric' ? hourly.pressure_mb : hourly.pressure_in}
              pressureUnit={mode === 'metric' ? 'mb' : 'in'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
