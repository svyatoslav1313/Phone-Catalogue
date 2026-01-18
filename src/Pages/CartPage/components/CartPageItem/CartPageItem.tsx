import React, { useContext } from 'react';
import styles from './CartPageItem.module.scss';
import { Phone } from '../../../../types/Phone';
import { CartContext } from '../../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus } from 'lucide-react';

type Props = {
  productItem: Phone;
  quantity: number;
};

export const CartPageItem: React.FC<Props> = ({ productItem, quantity }) => {
  const { increaseQuantity, decreaseQuantity, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className={styles.item}>
      <div className={styles.itemInfo}>
        <X
          size={16}
          className={styles.icon}
          onClick={() => clearCart(productItem.id)}
        />
        <img
          src={productItem.images[0]}
          className={styles.image}
          onClick={() => navigate(`/product/${productItem.id}`)}
        />
        <span
          className={styles.itemName}
          onClick={() => navigate(`/product/${productItem.id}`)}
        >
          {productItem.name}
        </span>
      </div>
      <div className={styles.actions}>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => decreaseQuantity(productItem.id)}
          >
            <Minus size={16} className={styles.buttonIcon} />
          </button>
          <span>{quantity}</span>
          <button
            className={styles.button}
            onClick={() => increaseQuantity(productItem.id)}
          >
            <Plus size={16} className={styles.buttonIcon} />
          </button>
        </div>
        <h3
          className={styles.summary}
        >{`$${Number(productItem.priceDiscount) * quantity}`}</h3>
      </div>
    </div>
  );
};
