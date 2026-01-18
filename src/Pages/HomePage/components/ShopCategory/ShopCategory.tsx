import styles from './ShopCategory.module.scss';
import phones from '../../../../assets/images/categories/phone-category.png';
import tablets from '../../../../assets/images/categories/tablets-category.png';
import accessories from '../../../../assets/images/categories/accessories.webp';
import { Link } from 'react-router-dom';

export const ShopCategory = () => {
  return (
    <section className={styles.shopCategory}>
      <h2 className={styles.title}>Shop by category</h2>
      <article className={styles.category}>
        <Link
          to='/phones'
          className={styles.imageContainer}
          style={{ backgroundColor: '#FEEAEA' }}
        >
          <img src={phones} alt='phones' className={styles.image} />
        </Link>
        <div className={styles.info}>
          <h4>Mobile phones</h4>
          <p className={styles.modelsCount}>124 models</p>
        </div>
      </article>
      <article className={styles.category}>
        <Link
          to='/tablets'
          className={styles.imageContainer}
          style={{ background: 'linear-gradient(180deg, #addcee, #d1e9f3)' }}
        >
          <img src={tablets} alt='tablets' className={styles.image} />
        </Link>
        <div className={styles.info}>
          <h4>Tablets</h4>
          <p className={styles.modelsCount}>36 models</p>
        </div>
      </article>
      <article className={styles.category}>
        <Link
          to='/accessories'
          className={styles.imageContainer}
          style={{ backgroundColor: '#EDE9E3' }}
        >
          <img src={accessories} alt='accessories' className={styles.image} />
        </Link>
        <div className={styles.info}>
          <h4>Accessories</h4>
          <p className={styles.modelsCount}>34 models</p>
        </div>
      </article>
    </section>
  );
};
