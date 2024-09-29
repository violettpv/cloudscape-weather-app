import styles from '@css/SavedCities.module.css';
import { generateKey } from '@services/utils';
import CityCard from './CityCard';
import { useContext } from 'react';
import SavedCitiesContext from '@store/SavedCitiesContext';

export default function SavedCities() {
  const { savedCities, removeCity } = useContext(SavedCitiesContext);

  const removeCityHandler = (city) => {
    removeCity(city);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Saved Cities</div>
      <div className={styles.savedCities}>
        {savedCities.length === 0 ? (
          <p>No saved cities yet.</p>
        ) : (
          savedCities.map((city) => (
            <CityCard
              key={generateKey(city.name)}
              city={city}
              onRemove={() => removeCityHandler(city)}
            />
          ))
        )}
      </div>
    </div>
  );
}
