import styles from './ToggleSwitch.module.css';
import { useContext, useEffect, useState } from 'react';
import ModeContext from '@store/ModeContext';

export default function ToggleSwitch() {
  const modeCtx = useContext(ModeContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(modeCtx.mode === 'imperial');
  }, [modeCtx.mode]);

  const toggleModeHandler = () => {
    modeCtx.toggleMode();
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={toggleModeHandler} checked={isChecked} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
}
