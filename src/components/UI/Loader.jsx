import styles from '@css/Loader.module.css';
import sunSrc from '../../images/sun.svg';

export default function StartPage() {
  return (
    <div className={styles.animation}>
      <div className={styles.sun}>
        <img src={sunSrc} alt="Sun" />
      </div>
    </div>
  );
}
