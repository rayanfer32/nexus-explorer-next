import styles from './Layout.module.scss';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

/**
 * Common layout for the nexplorer website
 * @param {*} children
 * @returns {JSX.Element}
 */
function Layout({ children }) {
  return (
    <section className={styles.main}>
      <Navbar />
      <main className={styles.container}>{children}</main>
      <Footer />
    </section>
  );
}

export default Layout;
