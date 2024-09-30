import styles from '@css/CityCard.module.css';
import { GoBookmarkSlash } from 'react-icons/go';

export default function CityCard({ city, onRemove, onSearch }) {
  const selectCityHandler = () => {
    onSearch(city.name);
  };

  return (
    <div className={styles.container}>
      <button className={styles.cityButton} onClick={selectCityHandler}>
        {city.name}, {city.country}
      </button>
      <button className={styles.unSaveButton} onClick={onRemove}>
        <GoBookmarkSlash />
      </button>
    </div>
  );
}
