import styles from './BlockData.module.scss';
import PropTypes from 'prop-types';
import PushLink from 'components/common/NE_Link';

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
        <PushLink
          href={href}
          className={styles.blockDetail}
          title={`${data} ${dataUnit}`}>
          <span className={styles.blockData}>{data}</span>
          <div className={styles.lowerThirdText}>{dataUnit}</div>
        </PushLink>
      ) : null}
    </>
  );
};

BlockData.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dataUnit: PropTypes.string,
  href: PropTypes.string,
};
