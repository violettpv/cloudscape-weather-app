export const getSavedCities = () => {
  return JSON.parse(localStorage.getItem('savedCities')) || [];
};

export const saveCityToLocalStorage = (city) => {
  const savedCities = getSavedCities();
  if (savedCities.length < 5) {
    savedCities.push(city);
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
    return true;
  } else {
    return false;
  }
};

export const removeCityFromLocalStorage = (cityToRemove) => {
  const savedCities = getSavedCities();
  const updatedCities = savedCities.filter(
    (city) => city.name !== cityToRemove.name || city.country !== cityToRemove.country
  );
  localStorage.setItem('savedCities', JSON.stringify(updatedCities));
};
