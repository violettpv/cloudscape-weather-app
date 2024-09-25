import styles from './Credits.module.css';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import LinkButton from './LinkButton';

export default function Credits() {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.text}>
          © {new Date().getFullYear()} Created by Violetta Poltava
        </p>
      </div>
      <div className={styles.linkButtons}>
        <LinkButton link={'https://www.linkedin.com/in/violettpv/'}>
          <FaLinkedin className={styles.icon} />
        </LinkButton>

        <LinkButton link={'https://github.com/violettpv'}>
          <FaGithub className={styles.icon} />
        </LinkButton>
      </div>
    </div>
  );
}
