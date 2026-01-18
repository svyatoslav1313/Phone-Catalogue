import styles from './Footer.module.scss';
import logo from '../../../assets/images/phone-catalog-logo-3x.png';
import { ChevronUp } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img src={logo} alt='logo' className={styles.logo} />
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <a href='#' className={styles.link}>
                Github
              </a>
            </li>
            <li>
              <a href='#' className={styles.link}>
                Contacts
              </a>
            </li>
            <li>
              <a href='#' className={styles.link}>
                rights
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.backToTop}>
          <p className={styles.text}>Back to top</p>
          <button
            type='button'
            className={styles.scrollBtn}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp size={16} className={styles.icon} />
          </button>
        </div>
      </div>
    </footer>
  );
};
