import React from 'react';
import styles from './ProductAbout.module.scss';
import { Phone } from '../../../../types/Phone';

type Props = {
  product: Phone;
};

export const ProductAbout: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.productAbout}>
      <div className={styles.title}>
        <h3>About</h3>
        <div className={styles.line}></div>
      </div>
      {product.description.map((description, index) => (
        <div key={index} className={styles.descriptionContainer}>
          <h4>{description.title}</h4>
          <p className={styles.description}>
            {description.text.map((line, i) => (
              <span key={i}>
                {line}
                <br />
                <br />
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};
