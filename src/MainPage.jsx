import './index.css';
import styles from '@css/MainPage.module.css';
import SavedCities from '@components/SavedCities';
import SearchBar from '@components/UI/SearchBar';
import GuideButton from '@components/UI/GuideButton';
import Credits from '@components/UI/Credits';
import ToggleSwitch from '@components/UI/ToggleSwitch';

export default function MainPage({ children, onSearch }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h3 className={styles.title}>Cloudscape</h3>
        </div>
        <div className={styles.menu}>
          <SearchBar onSearch={onSearch} />
          <ToggleSwitch />
          <GuideButton />
        </div>
      </header>
      <main className={styles.main}>
        {children}
        <SavedCities onSearch={onSearch} />
      </main>
      <footer className={styles.footer}>
        <Credits />
      </footer>
    </div>
  );
}
