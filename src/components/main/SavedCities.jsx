import styles from '@css/SavedCities.module.css';
import { generateKey } from '@services/utils';
import CityCard from './CityCard';
import { useState, useEffect } from 'react';
import { getSavedCities, removeCityFromLocalStorage } from '@services/storageUtils';

const citiesTest = [
  {
    name: 'Kyiv',
    country: 'Ukraine',
  },
  {
    name: 'Lviv',
    country: 'Ukraine',
  },
  {
    name: 'Odesa',
    country: 'Ukraine',
  },
  {
    name: 'Kharkiv',
    country: 'Ukraine',
  },
  {
    name: 'Dnipro',
    country: 'Ukraine',
  },
];

export default function SavedCities() {
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    const cities = getSavedCities();
    setSavedCities(cities);
  }, []);

  const removeCityHandler = (cityToRemove) => {
    removeCityFromLocalStorage(cityToRemove);
    setSavedCities(getSavedCities()); // Update state after removal
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Saved Cities</div>
      <div className={styles.savedCities}>
        {/* {citiesTest.map((city) => (
          <CityCard key={generateKey(city.name)} city={city} />
        ))} */}
        {savedCities.length === 0 ? (
          <div className={styles.noSaved}>No saved cities yet.</div>
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
