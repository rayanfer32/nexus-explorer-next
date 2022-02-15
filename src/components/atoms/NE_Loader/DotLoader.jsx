import TYPES from 'types';
import styles from './Loader.module.scss';
import PropTypes from 'prop-types';

const DotLoader = ({ size = '2.5rem', color = TYPES.COLORS.NEXUS_BLUE }) => {
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

export default DotLoader;

DotLoader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};
