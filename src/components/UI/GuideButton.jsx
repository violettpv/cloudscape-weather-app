import { FaQuestionCircle } from 'react-icons/fa';
import styles from '@css/GuideButton.module.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from '@components/UI/ModalContent';

export default function GuideButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.button} onClick={() => setShowModal(true)}>
        <FaQuestionCircle className={styles.icon} />
      </button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)}>
            <h3>Instructions</h3>
            <div className={styles.info}>
              <p>
                This app uses the WeatherAPI to get the weather forecast for the next 3
                days.
              </p>
              <p>
                To get the weather forecast, you can either enter the location in the
                search bar or allow the app to use your location.
              </p>
              <p>
                You can also switch between metric and imperial system by clicking the
                toggle button at the top right corner.
              </p>
              <p>
                You can save your favorite locations by clicking the star icon next to the
                location name.
              </p>
            </div>
          </ModalContent>,
          document.body
        )}
    </>
  );
}
