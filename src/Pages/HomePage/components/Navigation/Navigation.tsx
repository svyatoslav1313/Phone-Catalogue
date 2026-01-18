import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { HeaderContext } from '../../../../context/HeaderContext';

type Props = {
  direction: string;
  hidden?: boolean;
  gap?: string;
  bottom?: string;
};

export const Navigation: React.FC<Props> = ({
  direction,
  hidden,
  gap,
  bottom,
}) => {
  const { setMenuOpen } = useContext(HeaderContext);
  const { pathname } = useLocation();

  return (
    <nav
      className={classNames(styles.nav, {
        [styles.mobileHidden]: hidden,
      })}
    >
      <ul
        className={styles.list}
        style={{
          flexDirection: direction,
          gap: gap,
        }}
      >
        <li>
          <NavLink
            to='/home'
            className={classNames(styles.link, {
              [styles.active]: pathname.includes('/home'),
            })}
            style={{ '--after-bottom': bottom ? bottom : '-13px' }}
            onClick={() => setMenuOpen(false)}
          >
            home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/phones'
            className={({ isActive }) =>
              classNames(styles.link, {
                [styles.active]: isActive,
              })
            }
            style={{ '--after-bottom': bottom ? bottom : '-13px' }}
            onClick={() => setMenuOpen(false)}
          >
            Phones
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/tablets'
            className={({ isActive }) =>
              classNames(styles.link, {
                [styles.active]: isActive,
              })
            }
            style={{ '--after-bottom': bottom ? bottom : '-13px' }}
            onClick={() => setMenuOpen(false)}
          >
            tablets
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/accessories'
            className={({ isActive }) =>
              classNames(styles.link, {
                [styles.active]: isActive,
              })
            }
            style={{ '--after-bottom': bottom ? bottom : '-13px' }}
            onClick={() => setMenuOpen(false)}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
