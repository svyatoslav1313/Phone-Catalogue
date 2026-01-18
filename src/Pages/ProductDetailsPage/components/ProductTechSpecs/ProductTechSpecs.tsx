import React, { useMemo } from 'react';
import styles from './ProductTechSpecs.module.scss';
import { Phone } from '../../../../types/Phone';

type Props = {
  product: Phone;
};

export const ProductTechSpecs: React.FC<Props> = ({ product }) => {
  const preparedProduct = useMemo(() => {
    const { screen, resolution, processor, ram, capacity, camera, zoom, cell } =
      product;

    return {
      screen,
      resolution,
      processor,
      ram,
      capacity,
      camera,
      zoom,
      cell: cell.join(', '),
    };
  }, [product]);

  return (
    <div className={styles.techSpecs}>
      <div className={styles.title}>
        <h3>Tech specs</h3>
        <div className={styles.line}></div>
      </div>
      <div className={styles.list}>
        {Object.entries(preparedProduct).map(
          ([key, value]) =>
            value && (
              <div key={key} className={styles.specRow}>
                <span className={styles.label}>{key}:</span>
                <span className={styles.value}>{value}</span>
              </div>
            ),
        )}
      </div>
    </div>
  );
};
