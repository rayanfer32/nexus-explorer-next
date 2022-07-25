import TYPES from 'types';
import styles from './Loader.module.scss';
import PropTypes from 'prop-types';
import { cls } from 'utils';

const CircleLoader = ({
  className = '',
  size = '2.5rem',
  color = TYPES.COLORS.NEXUS_BLUE,
}) => {
  const style = { '--color': color, '--c-size': size };
  return (
    <div className={cls(className, styles.loader)} style={style}>
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
