import styles from '@css/CityCard.module.css';
import { GoBookmarkSlash } from 'react-icons/go';

export default function CityCard({ city, onCityClick, onRemove }) {
  return (
    <div className={styles.container}>
      <button
        className={styles.cityButton}
        // onClick={onCityClick(city)}
      >
        {city.name}, {city.country}
      </button>
      <button className={styles.unSaveButton} onClick={onRemove}>
        <GoBookmarkSlash />
      </button>
    </div>
  );
}
