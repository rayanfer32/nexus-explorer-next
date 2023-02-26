import styles from './Layout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import ScrollToTop from 'components/common/NE_ScrollToTop';
import { motion } from 'framer-motion';

function MotionDiv({ children }) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
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
        <main className={styles.container}>
          <MotionDiv>{children}</MotionDiv>
        </main>
        <Footer />
      </section>
      <ScrollToTop />
    </>
  );
}

export default Layout;
