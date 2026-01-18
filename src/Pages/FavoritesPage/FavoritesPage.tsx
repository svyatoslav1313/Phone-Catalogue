import styles from './FavoritesPage.module.scss';
import { useContext } from 'react';
import { PageTop } from '../../shared/components/PageTop/PageTop';
import { FavoritesContext } from '../../context/FavoritesContext';
import empty from '../../../public/img/cart-is-empty.png';
import { ProductList } from '../../shared/components/ProductList/ProductList';

export const FavoritesPage = () => {
  const { items } = useContext(FavoritesContext);

  return (
    <>
      {items.length === 0 ? (
        <div className={styles.emptyContainer}>
          <img src={empty} alt='empty' className={styles.empty} />
        </div>
      ) : (
        <>
          <PageTop pageName='Favorites' />
          <div className={styles.favorites}>
            <h1 className={styles.title}>Favorites</h1>
            <span className={styles.itemsCount}>{items.length} items</span>

            <ProductList products={items} />
          </div>
        </>
      )}
    </>
  );
};
