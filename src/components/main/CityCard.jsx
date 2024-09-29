import styles from '@css/CityCard.module.css';
import { GoBookmarkSlash } from 'react-icons/go';

export default function CityCard({ city, onRemove }) {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {city.name}, {city.country}
      </div>
      <button className={styles.saveButton} onClick={onRemove}>
        <GoBookmarkSlash />
      </button>
    </div>
  );
}
