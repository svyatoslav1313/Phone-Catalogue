import { PageTop } from '../../shared/components/PageTop/PageTop';
import styles from './ProductDetailsPage.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { ProductAbout } from './components/ProductAbout';
import { ProductTechSpecs } from './components/ProductTechSpecs';
import { ProductMainControls } from './components/ProductMainControls';
import { AlsoLike } from './components/AlsoLike';
import { Loader } from '../../shared/components/utils/Loader';
import productNotFound from '../../../public/img/product-not-found.png';
import { ChevronLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { productService } from '../../services/productService';

export const ProductDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/home';

  const product = useMemo(() => {
    return productId ? productService.getDetailById(productId) : undefined;
  }, [productId]);

  const [selectedPhoto, setSelectedPhoto] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (product) {
      setSelectedPhoto(product.images[0]);
    }
  }, [product]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className={styles.notProductContainer}>
        <img
          src={productNotFound}
          alt='Product not found'
          className={styles.notProductImage}
        />
      </div>
    );
  }

  return (
    <>
      <PageTop productInfo={false} dropdowns={false} itemName={product.name} />
      <div className={styles.productDetails}>
        <Link to={from} className={styles.button}>
          <ChevronLeft className={styles.icon} />
          <span className={styles.buttonText}>Back</span>
        </Link>
        <h2 className={styles.name}>{product.name}</h2>
        <div className={styles.imageContainer}>
          <img
            src={selectedPhoto || product.images[0]}
            alt={product.name}
            className={styles.image}
          />
        </div>
        <div className={styles.smallImages}>
          {product.images.map(img => (
            <button
              key={img}
              type='button'
              className={clsx(styles.smallImageContainer, {
                [styles.active]: (selectedPhoto || product.images[0]) === img,
              })}
              onClick={() => setSelectedPhoto(img)}
              aria-label={`View ${product.name} view ${img}`}
            >
              <img src={img} alt={product.name} className={styles.smallImage} />
            </button>
          ))}
        </div>
        <ProductMainControls product={product} />
        <ProductAbout product={product} />
        <ProductTechSpecs product={product} />
        <AlsoLike currentProduct={product} />
      </div>
    </>
  );
};
