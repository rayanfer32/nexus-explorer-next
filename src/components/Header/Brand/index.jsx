import Image from 'next/image';
import styles from './Brand.module.scss';
import TYPES from 'types';
import { NETWORKS } from 'types/ConstantsTypes';
import { RiTestTubeLine } from 'react-icons/ri';
import { BiTestTube } from 'react-icons/bi';
import { GrTest } from 'react-icons/gr';

const TestnetIndicator = () => {
  return <BiTestTube />;
  // return <div className="">testnet</div>

  // <RiTestTubeLine/>
};

/**
 * Brand Logo for the website
 * @param {boolean} isDarkMode theme based brand logo
 * @param {Function} onClick function to handle click event
 * @returns {JSX.Element}
 */
const Brand = ({ isDarkMode = false, onClick = () => null, network }) => {
  const isTestnet = NETWORKS.TESTNET.name == network;

  // * create 4 brand themes

  function customStyles() {
    let lightMainnet = {
      color: TYPES.COLORS.NEXUS_BLUE,
    };

    let darkMainnet = {
      color: TYPES.COLORS.WHITE,
    };

    let lightTestnet = {
      color: TYPES.COLORS.NEXUS_BLUE,
      filter: 'hue-rotate(-30deg) contrast(0.98)',
    };

    let darkTestnet = {
      color: TYPES.COLORS.NEXUS_BLUE,
      filter: 'hue-rotate(-30deg) contrast(1.8)',
    };

    if (isTestnet) {
      return isDarkMode ? darkTestnet : lightTestnet;
    } else {
      return isDarkMode ? darkMainnet : lightMainnet;
    }
  }

  return (
    <div className={styles.brand} style={customStyles()} onClick={onClick}>
      <Image
        width={142}
        height={32}
        layout="fixed"
        src={
          isDarkMode
            ? isTestnet
              ? TYPES.NAVBAR.BRAND.BLUE
              : TYPES.NAVBAR.BRAND.WHITE
            : TYPES.NAVBAR.BRAND.BLUE
        }
        alt="NEXUS"></Image>
      <div className={styles.explorer}>
        Explorer {isTestnet && <TestnetIndicator />}
      </div>
    </div>
  );
};

export default Brand;
