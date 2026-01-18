import React, { useContext } from 'react';
import styles from './Checkout.module.scss';
import { CartContext } from '../../../../context/CartContext';

type Props = {
  onShowCheckout: (value: boolean) => void;
};

export const Checkout: React.FC<Props> = ({ onShowCheckout }) => {
  const { clearAll } = useContext(CartContext);

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkout}>
        <span>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </span>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={clearAll}>
            Yes, clear the cart
          </button>
          <button
            className={styles.button}
            onClick={() => onShowCheckout(false)}
          >
            No, keep it
          </button>
        </div>
      </div>
    </div>
  );
};
