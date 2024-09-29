import { createContext, useState, useEffect } from 'react';
import {
  getSavedCities,
  saveCityToLocalStorage,
  removeCityFromLocalStorage,
} from '@services/storageUtils';

const SavedCitiesContext = createContext({
  savedCities: [],
  addCity: () => {},
  removeCity: () => {},
});

export function SavedCitiesProvider({ children }) {
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    // initialize the context with cities from localStorage
    const cities = getSavedCities();
    setSavedCities(cities);
  }, []);

  const addCity = (city) => {
    const success = saveCityToLocalStorage(city);
    if (success) {
      setSavedCities(getSavedCities());
    }
    return success;
  };

  const removeCity = (cityToRemove) => {
    removeCityFromLocalStorage(cityToRemove);
    setSavedCities(getSavedCities());
  };

  const savedCitiesCtx = {
    savedCities,
    addCity,
    removeCity,
  };

  return (
    <SavedCitiesContext.Provider value={savedCitiesCtx}>
      {children}
    </SavedCitiesContext.Provider>
  );
}

export default SavedCitiesContext;
