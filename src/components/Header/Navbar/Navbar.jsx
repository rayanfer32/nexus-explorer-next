import SelectInput from 'components/atoms/SelectInput';
import ThemeMode from 'components/atoms/ThemeMode';
import { NETWORKS } from 'types/ConstantsTypes';
import styles from './Navbar.module.scss';
import NavLinks from '../Navlinks';

const Navbar = ({ isMobile = false, ...props }) => {
  if (isMobile) <MobileMenu {...props} />;
  return <DesktopNavbar {...props} />;
};

export default Navbar;

export const DesktopNavbar = ({
  activePathname = '',
  isDark = false,
  network = '',
  onNetworkChange = () => null,
  onThemeChange = () => null,
}) => {
  return (
    <>
      <div className={styles.navItems}>
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

export const Hamburger = ({ onClick = () => null }) => {
  return (
    <div className={styles.Mobile__hamburger} onClick={onClick}>
      <div className={styles.hamIcon} />
    </div>
  );
};

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
          <div className={styles.closeHam} onClick={onClose} />
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
