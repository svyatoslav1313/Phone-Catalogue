import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Menu } from '../Pages/HomePage/components/Menu';

export const App = () => (
  <div className={styles.App}>
    <Header />
    <Menu />

    <div className={styles.container}>
      <Outlet />
    </div>
    <Footer />
  </div>
);
