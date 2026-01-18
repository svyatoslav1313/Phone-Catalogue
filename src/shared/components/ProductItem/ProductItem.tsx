import React, { useContext, useMemo } from 'react';
import styles from './ProductItem.module.scss';
import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { productService } from '../../../services/productService';
import { CartContext } from '../../../context/CartContext';
import { FavoritesContext } from '../../../context/FavoritesContext';
import { Product } from '../../../types/Product';
import { Phone } from '../../../types/Phone';
import { Heart } from 'lucide-react';

type Props = {
  product: Product | Phone;
  fullPrice?: boolean;
  widthItem: 'homePage' | 'catalog';
  find?: boolean;
};

export const ProductItem: React.FC<Props> = ({
  product,
  fullPrice,
  widthItem,
  find,
}) => {
  const { pathname } = useLocation();
  const fullProduct = useMemo(() => {
    if (find) {
      // If we need to find, 'product' is a Product summary with itemId
      const p = product as Product;

      return productService.getDetailById(p.itemId);
    }

    // Otherwise it is already a Phone detailed object
    return product as Phone;
  }, [find, product]);

  const { toggleToCart, items: cartItems } = useContext(CartContext);
  const { toggleFavorites, items: favoritesItems } =
    useContext(FavoritesContext);

  const inCart = useMemo(
    () => cartItems.some(item => item.product.id === fullProduct?.id),
    [cartItems, fullProduct],
  );

  const inFavorites = useMemo(
    () => favoritesItems.some(item => item.id === fullProduct?.id),
    [favoritesItems, fullProduct],
  );

  if (!fullProduct) {
    return null;
  }

  return (
    <article
      className={clsx(
        styles.product,
        widthItem === 'homePage' ? styles.home : styles.catalog,
      )}
    >
      <Link
        to={`/product/${fullProduct.id}`}
        state={{ from: pathname }}
        className={styles.header}
      >
        <div
          className={clsx(
            styles.imageContainer,
            widthItem === 'homePage'
              ? styles.homeImageContainer
              : styles.catalogImageContainer,
          )}
        >
          <img
            src={fullProduct.images[0]}
            alt={product.name}
            className={styles.image}
          />
        </div>
        <span className={styles.name}>{product.name}</span>
      </Link>
      <div className={styles.priceContainer}>
        <h3 className={styles.price}>{`$${fullProduct.priceDiscount}`}</h3>
        {fullPrice && (
          <h3 className={styles.fullPrice}>{`$${fullProduct.priceRegular}`}</h3>
        )}
      </div>
      <div className={styles.line}></div>
      <div className={styles.description}>
        <div className={styles.specRow}>
          <p className={styles.label}>Screen</p>
          <p className={styles.value}>{fullProduct.screen}</p>
        </div>
        <div className={styles.specRow}>
          <p className={styles.label}>Capacity</p>
          <p className={styles.value}>{fullProduct.capacity}</p>
        </div>
        <div className={styles.specRow}>
          <p className={styles.label}>RAM</p>
          <p className={styles.value}>{fullProduct.ram}</p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => toggleToCart(fullProduct)}
          className={clsx(
            styles.button,
            widthItem === 'homePage' ? styles.homeButton : styles.catalogButton,
            {
              [styles.addedButton]: inCart,
            },
          )}
        >
          {`${inCart ? 'Added' : 'Add to cart'}`}
        </button>
        <button
          className={styles.favBtn}
          onClick={() => toggleFavorites(fullProduct)}
        >
          <Heart
            size={18}
            className={clsx(styles.favIcon, inFavorites && styles.addedFavIcon)}
          />
        </button>
      </div>
    </article>
  );
};
