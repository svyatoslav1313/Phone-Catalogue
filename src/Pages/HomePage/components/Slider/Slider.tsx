import styles from './Slider.module.scss';

// #region sliderMobile
import sliderMobile1 from '../../../../assets/images/slider/slider-image-1.png';
import sliderMobile2 from '../../../../assets/images/slider/slider-image-2.png';
import sliderMobile3 from '../../../../assets/images/slider/slider-image-3.png';
// #endregion

// #region sliderDesktop
import sliderTablet1 from '../../../../assets/images/slider/tablet-image-1.png';
import slideTablet2 from '../../../../assets/images/slider/tablet-image-2.webp';
import sliderTablet3 from '../../../../assets/images/slider/tablet-image-3.jpg';
// #endregion
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';

export const Slider = () => {
  const images = [
    {
      mobile: sliderMobile1,
      tablet: sliderTablet1,
    },
    {
      mobile: sliderMobile2,
      tablet: slideTablet2,
    },
    {
      mobile: sliderMobile3,
      tablet: sliderTablet3,
    },
  ];
  const [index, setIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }, [index, images.length]);

  const handlePrev = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(images.length - 1);
    }
  }, [index, images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext]);

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  });

  return (
    <div className={styles.slider}>
      <div className={styles.wrapper}>
        <div className={styles.button} onClick={handlePrev}>
          <ChevronLeft />
        </div>
        <div className={styles.container} {...handlers}>
          <ul
            className={styles.list}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((image, i) => (
              <li className={styles.item} key={i}>
                <picture>
                  <source srcSet={image.tablet} media='(min-width: 640px)' />
                  <img
                    src={image.mobile}
                    alt={`image-${i}`}
                    className={styles.image}
                  />
                </picture>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.button} onClick={handleNext}>
          <ChevronRight />
        </div>
      </div>
      <div className={styles.indicators}>
        {images.map((_, i) => (
          <div
            key={i}
            className={classNames(styles.indicator, {
              [styles.indicatorActive]: i === index,
            })}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};
