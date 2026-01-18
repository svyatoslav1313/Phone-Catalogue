import styles from './Loader.module.scss';
import { Loader as LoaderIcon } from 'lucide-react';

export const Loader = () => (
  <div className={styles.loaderContainer} data-cy='loader'>
    <LoaderIcon size={40} className={styles.loader} />
  </div>
);
