import React from 'react';
import styles from './ProductSliderButtons.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  length: number;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const ProductSliderButtons: React.FC<Props> = ({
  length,
  index,
  setIndex,
}) => {
  const handleNext = () => {
    if (index < length - 1) {
      setIndex(prev => prev + 1);
    } else {
      setIndex(0);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
    } else {
      setIndex(length - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={handlePrev}>
        <ChevronLeft />
      </div>
      <div className={styles.button} onClick={handleNext}>
        <ChevronRight />
      </div>
    </div>
  );
};
