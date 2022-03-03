import styles from './BlockData.module.scss';
import PropTypes from 'prop-types';

/**
 * Component to display Data with its unit
 *
 * @param {string} data value to be displayed
 * @param {string} dataUnit value unit
 * @param {string} href link to be opened
 * @returns {JSX.Element}
 */
export const BlockData = ({ data, dataUnit, href }) => {
  return (
    <>
      {data ? (
        <a
          href={href}
          className={styles.blockDetail}
          title={`${data} ${dataUnit}`}>
          <span className={styles.blockData}>{data}</span>
          <div className={styles.lowerThirdText}>{dataUnit}</div>
        </a>
      ) : null}
    </>
  );
};

BlockData.propTypes = {
  data: PropTypes.string,
  dataUnit: PropTypes.string,
  href: PropTypes.string,
};
