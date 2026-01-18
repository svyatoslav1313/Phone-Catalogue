import styles from './CartPage.module.scss';
import { ChevronLeft } from 'lucide-react';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { CartPageItem } from './components/CartPageItem/CartPageItem';
import { CartPageTotal } from './components/CartPageTotal';
import cartEmpty from '../../../public/img/cart-is-empty.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { Checkout } from './components/Checkout';

export const CartPage = () => {
  const { items } = useContext(CartContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      {items.length === 0 ? (
        <div className={styles.cartEmptyContainer}>
          <img className={styles.cartEmpty} src={cartEmpty} />
        </div>
      ) : (
        <section className={styles.cart}>
          <div
            className={styles.backButton}
            onClick={() => navigate(state.prev)}
          >
            <ChevronLeft size={16} />
            <span className={styles.backButtonText}>Back</span>
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>Cart</h1>
            <div className={styles.list}>
              {items.map(item => (
                <CartPageItem
                  key={item.product.id}
                  productItem={item.product}
                  quantity={item.quantity}
                />
              ))}
            </div>
            <CartPageTotal onShowCheckout={value => setShowCheckout(value)} />
          </div>
          {showCheckout && (
            <Checkout onShowCheckout={value => setShowCheckout(value)} />
          )}
        </section>
      )}
    </>
  );
};
