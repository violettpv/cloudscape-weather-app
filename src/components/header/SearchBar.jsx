import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  return (
    <div className={styles.searchBarElements}>
      <FaSearch className={styles.icon} />
      <input className={styles.searchInput} />
    </div>
  );
}
