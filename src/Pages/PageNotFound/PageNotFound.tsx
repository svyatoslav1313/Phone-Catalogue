import styles from './PageNotFound.module.scss';
import pageNotFound from '../../../public/img/page-not-found.png';

export const PageNotFound = () => (
  <div className={styles.imageContainer}>
    <img src={pageNotFound} alt='pageNotFound' className={styles.image} />
  </div>
);
