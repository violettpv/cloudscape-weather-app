import styles from '@css/ModalContent.module.css';

export default function ModalContent({ children, onClose }) {
  return (
    <div className={styles.modal}>
      <div>{children}</div>
      <button className={styles.button} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
