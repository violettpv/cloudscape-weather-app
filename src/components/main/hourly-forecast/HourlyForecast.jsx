import styles from './HourlyForecast.module.css';
import HourlyData from './HourlyData';
import { WiSunset, WiSunrise } from 'react-icons/wi';
import { useContext, useEffect, useRef } from 'react';
import ModeContext from '@store/ModeContext';
import { convertTo24Hour } from '@util';

export default function HourlyForecast({ data }) {
  const modeCtx = useContext(ModeContext);
  const mode = modeCtx.mode;

  const forecastContainerRef = useRef(null);
  const currentHourRef = useRef(null);
  const currentHour = new Date().getHours();

  // const today = new Date().getDate();
  // const hourlyData = data.forecast.forecastday[0].hour.filter(
  //   (hour) => new Date(hour.time).getDate() === today
  // );
  const hourlyData = data.forecast.forecastday[0].hour;
  // Define hourlyData even if data is missing
  //  const hourlyData = data?.forecast?.forecastday?.[0]?.hour || [];

  useEffect(() => {
    if (currentHourRef.current && forecastContainerRef.current) {
      const forecastContainer = forecastContainerRef.current;
      const currentHourElement = currentHourRef.current;
      // Get the horizontal position of the current hour element relative to the forecast container
      const scrollOffset = currentHourElement.offsetLeft - forecastContainer.offsetLeft;

      forecastContainer.scrollTo({
        left: scrollOffset, // Scroll to the calculated position
        behavior: 'smooth',
      });
    }
  }, [hourlyData]);

  if (!data || !data.forecast || !data.forecast.forecastday) {
    return <div>Loading hourly forecast...</div>;
  }

  if (!hourlyData.length) {
    return <div>No hourly data available for today</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <p>Hourly forecast for today</p>
      </div>

      <div className={styles.sun}>
        <div>
          <WiSunrise className={styles.icon} />
          <span>
            {mode === 'metric'
              ? convertTo24Hour(data.forecast.forecastday[0].astro.sunrise)
              : data.forecast.forecastday[0].astro.sunrise}
          </span>
        </div>
        <div>
          <WiSunset className={styles.icon} />
          <span>
            {mode === 'metric'
              ? convertTo24Hour(data.forecast.forecastday[0].astro.sunset)
              : data.forecast.forecastday[0].astro.sunset}
          </span>
        </div>
      </div>

      <div className={styles.forecast} ref={forecastContainerRef}>
        {hourlyData.map((hourly) => (
          <div
            key={hourly.time_epoch}
            ref={currentHour === new Date(hourly.time).getHours() ? currentHourRef : null}
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

      {/* <div className={styles.forecast}>
        {hourlyData.map((hourly) => (
          <div key={hourly.time_epoch}>
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
      </div> */}
    </div>
  );
}
