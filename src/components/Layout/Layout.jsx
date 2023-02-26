import styles from './Layout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import ScrollToTop from 'components/common/NE_ScrollToTop';
import { motion } from 'framer-motion';

function MotionDiv({ children }) {
  return (
    <motion.div
      className={styles.container}
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 200, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 50,
      }}>
      {children}
    </motion.div>
  );
}

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
        <MotionDiv>
          <main>{children}</main>
        </MotionDiv>
        <Footer />
      </section>
      <ScrollToTop />
    </>
  );
}

export default Layout;
