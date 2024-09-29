import { FaQuestionCircle } from 'react-icons/fa';
import styles from '@css/GuideButton.module.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from '../UI/ModalContent';

export default function GuideButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.button} onClick={() => setShowModal(true)}>
        <FaQuestionCircle className={styles.icon} />
      </button>
      {showModal &&
        createPortal(<ModalContent onClose={() => setShowModal(false)} />, document.body)}
    </>
  );
}
