import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        To view the weather you need to enable your geolocation or search for city in the
        search bar.
      </div>
    </div>
  );
}
