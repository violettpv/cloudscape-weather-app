import { FaSearch } from 'react-icons/fa';
import styles from '@css/SearchBar.module.css';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      if (city.trim()) {
        onSearch(city.trim());
      }
    }
  };

  return (
    <div className={styles.searchBarElements}>
      <FaSearch className={styles.icon} />
      <input
        className={styles.searchInput}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyUp={handleSearch}
        placeholder="Enter city name"
      />
    </div>
  );
}
