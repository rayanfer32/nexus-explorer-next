import TYPES from 'types';
import styles from './Loader.module.scss';
import PropTypes from 'prop-types';

const CircleLoader = ({
  className = '',
  size = '2.5rem',
  color = TYPES.colors.nexusBlue,
}) => {
  const style = { '--color': color, '--c-size': size };
  return (
    <div className={[className, styles.loader].join(' ')} style={style}>
      <div className={styles['circle']}>
        <div className={styles['circle-chord']} />
        <div className={styles['circle-chord']} />
        <div className={styles['circle-chord']} />
      </div>
    </div>
  );
};

export default CircleLoader;

CircleLoader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};
