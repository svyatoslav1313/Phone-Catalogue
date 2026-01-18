import React from 'react';
import { DropDowns } from '../DropDowns/DropDowns';
import styles from './PageTop.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { House, ChevronRight } from 'lucide-react';

type Props = {
  title?: string;
  pageName?: string;
  productsLength?: number;
  productInfo?: boolean;
  dropdowns?: boolean;
  itemName?: string;
};

export const PageTop: React.FC<Props> = ({
  title,
  pageName,
  productsLength,
  productInfo,
  dropdowns,
  itemName,
}) => {
  const location = useLocation();
  const from = location.state?.from || '/home';
  const navigate = useNavigate();

  const getBreadcrumbs = (fromLocation: string) => {
    if (fromLocation === '/phones') {
      return 'Phones';
    }

    if (fromLocation === '/tablets') {
      return 'Tablets';
    }

    if (fromLocation === '/accessories') {
      return 'Accessories';
    }

    return null;
  };

  const breadcrumb = getBreadcrumbs(from);

  return (
    <div className={styles.catalogHeader}>
      <div className={styles.breadcrumbContainer}>
        <Link to='/home' className={styles.houseContainer}>
          <House size={16} className={styles.house} />
        </Link>
        {pageName && <ChevronRight size={16} className={styles.arrow} />}
        <span className={styles.pageName}>{pageName}</span>
        {breadcrumb && <ChevronRight size={16} className={styles.arrow} />}
        {breadcrumb && (
          <p className={styles.pageName} onClick={() => navigate(from)}>
            {breadcrumb}
          </p>
        )}
        {itemName && <ChevronRight size={16} className={styles.arrow} />}
        {itemName && <p className={styles.itemName}>{itemName}</p>}
      </div>
      {productInfo && (
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.count}>{`${productsLength} models`}</p>
        </div>
      )}
      {dropdowns && <DropDowns />}
    </div>
  );
};
