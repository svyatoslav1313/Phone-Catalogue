import styles from './Pagination.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  searchParams: URLSearchParams;
  onSearchParams: (value: URLSearchParams) => void;
  itemsAmount: number;
  productsLength: number;
};

export const Pagination: React.FC<Props> = ({
  searchParams,
  onSearchParams,
  itemsAmount,
  productsLength,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(productsLength / itemsAmount); i++) {
    pages.push(i);
  }

  useEffect(() => {
    if (!searchParams.get('page')) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('page', '1');
      onSearchParams(newParams);
    }
  }, [searchParams, onSearchParams]);

  const getPageLink = (page: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', page);

    return `?${newParams.toString()}`;
  };

  const handleArrow = (arrowDirection: string) => {
    const currentPage = searchParams.get('page');

    if (
      currentPage &&
      currentPage !== '1' &&
      currentPage !== String(pages.length)
    ) {
      const newParams = new URLSearchParams(searchParams);

      if (arrowDirection === 'next') {
        const page = +currentPage + 1;

        newParams.set('page', String(page));

        return `?${newParams.toString()}`;
      } else {
        const page = +currentPage - 1;

        newParams.set('page', String(page));

        return `?${newParams.toString()}`;
      }
    }

    return `?${searchParams.toString()}`;
  };

  return (
    <div className={styles.container}>
      <Link to={handleArrow('prev')} className={styles.arrow}>
        <ChevronLeft />
      </Link>
      <div className={styles.items}>
        {pages.map(page => (
          <Link
            to={getPageLink(String(page))}
            key={page}
            className={classNames(styles.item, {
              [styles.active]: Number(searchParams.get('page')) === page,
            })}
          >
            {page}
          </Link>
        ))}
      </div>
      <Link to={handleArrow('next')} className={styles.arrow}>
        <ChevronRight />
      </Link>
    </div>
  );
};
