import TYPES from 'types';
import styles from './Loader.module.scss';
import PropTypes from 'prop-types';

// TODO: Delete `DotLoader` once succefull implimentaion
export const DotLoader = ({
  size = '2.5rem',
  color = TYPES.COLORS.NEXUS_BLUE,
}) => {
  const style = { '--color': color, '--d-size': size };
  return (
    <div className={styles.loader} style={style}>
      <div className={styles['holder']}>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </div>
    </div>
  );
};

const Dot = () => <div className={styles.dot} />;

DotLoader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export const DotLoaderSvg = ({
  size = 48,
  color = TYPES.COLORS.NEXUS_BLUE,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="12" r="3" fill={color}>
      <animate
        id="spinner_jObz"
        begin="0;spinner_vwSQ.end-0.25s"
        attributeName="r"
        dur="0.75s"
        values="3;.2;3"
      />
    </circle>
    <circle cx="12" cy="12" r="3" fill={color}>
      <animate
        begin="spinner_jObz.end-0.6s"
        attributeName="r"
        dur="0.75s"
        values="3;.2;3"
      />
    </circle>
    <circle cx="20" cy="12" r="3" fill={color}>
      <animate
        id="spinner_vwSQ"
        begin="spinner_jObz.end-0.45s"
        attributeName="r"
        dur="0.75s"
        values="3;.2;3"
      />
    </circle>
  </svg>
);
