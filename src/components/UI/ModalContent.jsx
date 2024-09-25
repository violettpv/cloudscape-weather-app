import styles from './ModalContent.module.css';

export default function ModalContent({ onClose }) {
  return (
    <div className={styles.modal}>
      <h3>Instructions</h3>
      <div className={styles.info}>
        <p>
          This app uses the WeatherAPI to get the weather forecast for the next 3 days.
        </p>
        <p>
          To get the weather forecast, you can either enter the location in the search bar
          or allow the app to use your location.
        </p>
        <p>
          You can also switch between metric and imperial system by clicking the toggle
          button at the top right corner.
        </p>
        <p>
          You can save your favorite locations by clicking the star icon next to the
          location name.
        </p>
      </div>
      <button className={styles.button} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
