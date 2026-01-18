import styles from './Header.module.scss';
import logo from '../../../assets/images/phone-catalog-logo-3x.png';

import { useContext } from 'react';
import { HeaderContext } from '../../../context/HeaderContext';
import { Navigation } from '../../../Pages/HomePage/components/Navigation';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import { FavoritesContext } from '../../../context/FavoritesContext';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';

export const Header = () => {
  const { menuOpen, setMenuOpen } = useContext(HeaderContext);
  const { items: cartItems, totalQuantity: totalQuantityCarts } =
    useContext(CartContext);
  const { items: favItems } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOpenMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.navigation}>
        <img
          className={styles.logo}
          src={logo}
          onClick={() => navigate('/home')}
        />
        <Navigation direction='row' hidden={true} />
      </div>
      {menuOpen ? (
        <X size={16} className={styles.menu} onClick={handleOpenMenu} />
      ) : (
        <Menu size={16} className={styles.menu} onClick={handleOpenMenu} />
      )}
      <div className={styles.icons}>
        <div
          className={styles.iconWrapper}
          onClick={() => navigate('/cart', { state: { prev: pathname } })}
        >
          <ShoppingBag size={16} className={styles.icon} />
          {cartItems.length !== 0 && (
            <div className={styles.circle}>
              <span className={styles.circleText}>{totalQuantityCarts}</span>
            </div>
          )}
        </div>
        <div
          style={{ cursor: 'pointer' }}
          className={styles.iconWrapper}
          onClick={() => navigate('/favorites')}
        >
          <Heart size={16} className={styles.icon} />
          {favItems.length !== 0 && (
            <div className={styles.circle}>
              <span className={styles.circleText}>{favItems.length}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
