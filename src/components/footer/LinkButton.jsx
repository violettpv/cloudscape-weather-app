import styles from '@css/LinkButton.module.css';

export default function LinkButton({ link, children }) {
  return (
    <button className={styles.button}>
      <a className={styles.link} target="_blank" href={link}>
        {children}
      </a>
    </button>
  );
}
