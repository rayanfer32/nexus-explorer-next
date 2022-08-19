import styles from './Layout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import ScrollToTop from 'components/common/NE_ScrollToTop';

/**
 * Common layout for the nexplorer website
 * @param {*} children
 * @returns {JSX.Element}
 */
function Layout({ children }) {
  return (
    <>
      {/* Need second opinion on section tag is it required or not */}
      <section className={styles.main}>
        <Header />
        <main className={styles.container}>{children}</main>
        <Footer />
      </section>
      <ScrollToTop />
    </>
  );
}

export default Layout;
