import SelectInput from 'components/atoms/NE_SelectInput';
import ThemeMode from 'components/atoms/NE_ThemeMode';
import { NETWORKS } from 'types/ConstantsTypes';
import styles from './Navbar.module.scss';
import NavLinks from '../Navlinks';
import PropTypes from 'prop-types';

/**
 * Single component for navbar
 * @param {boolean} param0 filter device type
 * @returns {JSX.Element}
 */
const Navbar = ({ isMobile = false, ...props }) => {
  if (isMobile) <MobileMenu {...props} />;
  return <DesktopNavbar {...props} />;
};

export default Navbar;

/**
 * Component to display navigation links
 * @param {string} activePathname get active pathname of page
 * @param {boolean} isDark get theme status
 * @param {string} network value which network is selected
 * @returns {JSX.Element}
 */
export const DesktopNavbar = ({
  activePathname = '',
  isDark = false,
  network = '',
  onNetworkChange = () => null,
  onThemeChange = () => null,
}) => {
  return (
    <>
      <div className={styles.desktopNavbar}>
        <NavLinks activePathname={activePathname} />
        <SelectInput
          options={[NETWORKS.MAINNET.name, NETWORKS.TESTNET.name]}
          value={network}
          onChange={onNetworkChange}
        />
        <ThemeMode onClick={onThemeChange} isDark={isDark} />
      </div>
    </>
  );
};

/**
 * Hamburger icon component
 * @param {Funtion} onClick toggle function for hamburger menu
 * @returns {JSX.Element}
 */
export const Hamburger = ({ onClick = () => null }) => {
  return (
    <div className={styles.Mobile__hamburger} onClick={onClick}>
      <div className={styles.hamIcon} />
    </div>
  );
};

/**
 * Component to display menu options for small screen
 * @param {string} activePathname get active pathname of page
 * @param {boolean} isDark get theme status
 * @param {boolean} isOpen status of menu options dispalyed or not
 * @param {string} network value which network is selected
 * @returns {JSX.Element}
 */
export const MobileMenu = ({
  activePathname = '',
  isDark = false,
  isOpen = true,
  network = '',
  onClose = () => null,
  onNetworkChange = () => null,
  onThemeChange = () => null,
  setClose = () => null,
}) => {
  return (
    <>
      <div className={styles.MobileView__mask} onClick={onClose} />
      <div className={styles.MobileView}>
        <div className={styles.MobileView__header}>
          <ThemeMode onClick={onThemeChange} isDark={isDark} />
          <SelectInput
            options={[NETWORKS.MAINNET.name, NETWORKS.TESTNET.name]}
            value={network}
            onChange={onNetworkChange}
          />
          <div className={styles.closeHamIcon} onClick={onClose} />
        </div>
        <div className={styles.MobileView__content}>
          <NavLinks
            activePathname={activePathname}
            isMobile={true}
            toggleMobileMenu={isOpen}
            setToggle={setClose}
          />
        </div>
      </div>
    </>
  );
};

DesktopNavbar.propTypes = {
  isDark: PropTypes.bool,
  activePathname: PropTypes.string,
  network: PropTypes.string,
  onNetworkChange: PropTypes.func,
  onThemeChange: PropTypes.func,
};
Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
};
MobileMenu.propTypes = {
  ...DesktopNavbar.propTypes,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  setClose: PropTypes.func,
};

Navbar.propTypes = {
  ...MobileMenu.propTypes,
};
