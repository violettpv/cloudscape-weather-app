import styles from '@css/Error.module.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from '@components/UI/ModalContent';

export default function Error({ title, message, openModal }) {
  const [showModal, setShowModal] = useState(false);

  if (openModal) {
    setShowModal(true);
  }

  return createPortal(
    <ModalContent onClose={() => setShowModal(false)}>
      <div className={styles.error}>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </ModalContent>,
    document.body
  );
}
