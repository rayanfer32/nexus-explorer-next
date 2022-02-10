import styles from './Layout.module.scss';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

/**
 * Common layout for the nexplorer website
 * @param {*} children
 * @returns {JSX.Element}
 */
function Layout({ children }) {
  return (
    <>
      <section className={styles.main}>
        <Navbar />
        <main className={styles.container}>{children}</main>
        <Footer />
      </section>
      <ScrollToTop />
    </>
  );
}

export default Layout;
