import { useEffect, useState } from 'react';
import styles from './DropDowns.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

const paginationOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'all' },
];

export const DropDowns = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const sortBy = searchParams.get('sort');
  const items = searchParams.get('items');

  useEffect(() => {
    if (!searchParams.get('sort')) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('sort', 'newest');
      setSearchParams(newParams);
    }
  }, [searchParams, setSearchParams]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const getItemsLink = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('items', field);
    newParams.set('page', '1');

    return `?${newParams.toString()}`;
  };

  const getSortLink = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', field);

    return `?${newParams.toString()}`;
  };

  return (
    <div className={styles.dropdowns}>
      <div className={styles.dropdownContainer}>
        <p className={styles.name}>Sort by</p>
        <button
          className={styles.dropdown}
          onClick={() => toggleDropdown('sort')}
        >
          <span className={styles.filter}>{sortBy}</span>
          <ChevronRight
            size={16}
            className={clsx(styles.icon, {
              [styles.rotate]: openDropdown === 'sort',
            })}
          />
        </button>
        <div
          className={clsx(styles.list, {
            [styles.hide]: openDropdown !== 'sort',
          })}
        >
          {sortOptions.map(option => (
            <Link
              key={option.value}
              to={getSortLink(option.value)}
              className={clsx(styles.itemContainer, {
                [styles.activeItemContainer]: sortBy === option.value,
              })}
              onClick={() => setOpenDropdown(null)}
            >
              <p
                className={clsx(styles.item, {
                  [styles.activeItem]: sortBy === option.value,
                })}
              >
                {option.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.dropdownContainer}>
        <p className={styles.name}>Items on page</p>
        <button
          className={styles.dropdown}
          onClick={() => toggleDropdown('items')}
        >
          <span className={styles.filter}>
            {searchParams.get('items') || 'all'}
          </span>
          <ChevronRight
            size={16}
            className={clsx(styles.icon, {
              [styles.rotate]: openDropdown === 'items',
            })}
          />
        </button>
        <div
          className={clsx(styles.list, {
            [styles.hide]: openDropdown !== 'items',
          })}
        >
          {paginationOptions.map(option => (
            <Link
              key={option.value}
              to={getItemsLink(option.value)}
              className={clsx(styles.itemContainer, {
                [styles.activeItemContainer]: items === option.value,
              })}
              onClick={() => setOpenDropdown(null)}
            >
              <p
                className={clsx(styles.item, {
                  [styles.activeItem]: items === option.value,
                })}
              >
                {option.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
