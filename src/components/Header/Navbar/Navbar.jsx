import SelectInput from 'components/common/NE_SelectInput';
import ThemeMode from 'components/common/NE_ThemeMode';
import { NETWORKS } from 'types/ConstantsTypes';
import styles from './Navbar.module.scss';
import NavLinks from '../Navlinks';
import PropTypes from 'prop-types';
import { cls } from 'utils';

/**
 * Single component for navbar
 * @param {boolean} param0 filter device type
 * @returns {JSX.Element}
 */
const Navbar = ({ isMobile = false, ...props }) => {
  return isMobile ? <MobileMenu {...props} /> : <DesktopNavbar {...props} />;
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
  network = '',
  onNetworkChange = () => null,
}) => {
  return (
    <>
      <div className={styles.desktopNavbar}>
        <NavLinks activePathname={activePathname} network={network} />
        <SelectInput
          options={[NETWORKS.MAINNET.name, NETWORKS.TESTNET.name]}
          value={network}
          onChange={onNetworkChange}
        />
        <ThemeMode />
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
  isOpen = false,
  network = '',
  onClose = () => null,
  onNetworkChange = () => null,
}) => {
  return (
    <>
      <div
        className={cls(
          styles.MobileView__mask,
          !isOpen && styles.collapseView__mask
        )}
        onClick={onClose}
      />
      <div className={cls(styles.MobileView, !isOpen && styles.collapseView)}>
        <div className={styles.MobileView__header}>
          <ThemeMode />
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
            onClick={onClose}
            network={network}
          />
        </div>
      </div>
    </>
  );
};

DesktopNavbar.propTypes = {
  activePathname: PropTypes.string,
  network: PropTypes.string,
  onNetworkChange: PropTypes.func,
};
Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
};
MobileMenu.propTypes = {
  ...DesktopNavbar.propTypes,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

Navbar.propTypes = {
  ...MobileMenu.propTypes,
};
