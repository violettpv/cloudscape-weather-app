import styles from '@css/StartPage.module.css';

export default function StartPage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>
          To view the weather you need to enable your geolocation or search for city in
          the search bar.
        </div>
      </div>
    </>
  );
}
