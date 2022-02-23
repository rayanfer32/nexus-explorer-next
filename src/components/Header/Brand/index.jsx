import Image from 'next/image';
import styles from './Brand.module.scss';
import TYPES from 'types';

/**
 * Brand Logo for the website
 * @param {boolean} isDarkMode theme based brand logo
 * @param {Function} onClick function to handle click event
 * @returns {JSX.Element}
 */
const Brand = ({ isDarkMode = false, onClick = () => null }) => {
  return (
    <div className={styles.brand} onClick={onClick}>
      <Image
        width={142}
        height={32}
        layout="fixed"
        src={isDarkMode ? TYPES.NAVBAR.BRAND.WHITE : TYPES.NAVBAR.BRAND.BLUE}
        alt="nexus logo"></Image>
      <div className={styles.explorer}>Explorer</div>
    </div>
  );
};

export default Brand;
