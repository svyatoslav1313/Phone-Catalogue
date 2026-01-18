import React, { useContext, useMemo, useState } from 'react';
import styles from './ProductMainControls.module.scss';
import { Phone } from '../../../../types/Phone';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../../context/CartContext';
import { FavoritesContext } from '../../../../context/FavoritesContext';
import { clsx } from 'clsx';
import { Heart } from 'lucide-react';
import { getColor } from './utils/colorMap';

type Props = {
  product: Phone;
};

export const ProductMainControls: React.FC<Props> = ({ product }) => {
  const [color, setColor] = useState<string>(product.color);
  const navigate = useNavigate();
  const { items: cartItems, toggleToCart } = useContext(CartContext);
  const { items: favItems, toggleFavorites } = useContext(FavoritesContext);

  const handleChangeColor = (prod: Phone, color: string) => {
    const splittedColor = color.split(' ');
    const joinedColor = splittedColor.join('-');

    navigate(
      `/product/${prod.namespaceId}-${prod.capacity.toLowerCase()}-${joinedColor}`,
    );
  };

  const handleChangeCapacity = (prod: Phone, newCapacity: string) => {
    const splittedColor = prod.color.split(' ');
    const joinedColor = splittedColor.join('-');

    navigate(
      `/product/${prod.namespaceId}-${newCapacity.toLowerCase()}-${joinedColor}`,
    );
  };

  const inCart = useMemo(
    () => cartItems.some(item => item.product.id === product.id),
    [cartItems, product.id],
  );
  const inFav = useMemo(
    () => favItems.some(item => item.id === product.id),
    [favItems, product.id],
  );

  return (
    <div className={styles.mainControls}>
      <div className={styles.optionGroup}>
        <p className={styles.optionTitle}>Available colors</p>
        <div className={styles.optionList}>
          {product.colorsAvailable.map((c, index) => (
            <label
              key={index}
              className={clsx(styles.colorContainer, {
                [styles.colorActive]: color === c,
              })}
            >
              <input
                type='radio'
                name='color'
                value={color}
                onChange={() => {
                  handleChangeColor(product, c);
                  setColor(c);
                }}
              />
              <div style={{ backgroundColor: getColor(c) }}></div>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.optionGroup}>
        <p className={styles.optionTitle}>Select capacity</p>
        <div className={styles.optionList}>
          {product.capacityAvailable.map((capacityProd, index) => (
            <label
              key={index}
              className={clsx(styles.capacityContainer, {
                [styles.capacityActive]: capacityProd === product.capacity,
              })}
            >
              <input
                type='radio'
                name='color'
                onChange={() => {
                  handleChangeCapacity(product, capacityProd);
                }}
              />
              <span className={styles.capacity}>
                {capacityProd.replace('GB', ' GB')}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.purchase}>
        <div className={styles.priceContainer}>
          <h2 className={styles.price}>{`$${product.priceDiscount}`}</h2>
          <span className={styles.oldPrice}>{`$${product.priceRegular}`}</span>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => toggleToCart(product)}
            className={clsx(styles.addToCart, {
              [styles.addedToCart]: inCart,
            })}
          >
            {`${inCart ? 'Added' : 'Add to cart'}`}
          </button>
          <div
            className={styles.iconContainer}
            onClick={() => toggleFavorites(product)}
          >
            <Heart
              size={18}
              className={clsx(styles.icon, {
                [styles.iconActive]: inFav,
              })}
            />
          </div>
        </div>
      </div>
      <div className={styles.specifications}>
        <div className={styles.specificationContainer}>
          <p className={styles.specLabel}>Screen</p>
          <p className={styles.specValue}>{product.screen}</p>
        </div>
        <div className={styles.specificationContainer}>
          <p className={styles.specLabel}>Resolution</p>
          <p className={styles.specValue}>{product.resolution}</p>
        </div>
        <div className={styles.specificationContainer}>
          <p className={styles.specLabel}>Processor</p>
          <p className={styles.specValue}>{product.processor}</p>
        </div>
        <div className={styles.specificationContainer}>
          <p className={styles.specLabel}>RAM</p>
          <p className={styles.specValue}>{product.ram}</p>
        </div>
      </div>
    </div>
  );
};
