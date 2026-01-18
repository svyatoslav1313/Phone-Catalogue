import { Navigation } from '../Navigation';
import styles from './Menu.module.scss';
import favourites from '../../../../assets/images/icones/favourites-icon.png';
import basket from '../../../../assets/images/icones/basket-icon.png';
import { useContext } from 'react';
import { HeaderContext } from '../../../../context/HeaderContext';
import { Link } from 'react-router-dom';

export const Menu = () => {
  const { menuOpen, setMenuOpen } = useContext(HeaderContext);

  return (
    <div className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
      <Navigation direction='column' gap='16px' bottom='-8px' />
      <div className={styles.buttons}>
        <Link
          to='/favorites'
          className={styles.iconContainer}
          onClick={() => setMenuOpen(false)}
        >
          <img src={favourites} className={styles.icon} />
        </Link>
        <div className={styles.divider}></div>
        <Link
          to='/cart'
          className={styles.iconContainer}
          onClick={() => setMenuOpen(false)}
        >
          <img src={basket} className={styles.icon} />
        </Link>
      </div>
    </div>
  );
};
