import styles from './Shimmer.module.scss';
import TYPES from 'types';

/**
 * Shimmer
 * @param {string} width width of the shimmer
 * @param {string} height hieght of shimmer
 * @param {string} minWidth min-width of the shimmer
 * @param {string} minHeight min-hieght of shimmer
 * @param {string} animate animation time in seconds
 * @param {string} animateWidth shine animation width coverage
 * @returns {Component}
 */
const Shimmer = ({
  type = 'default',
  width = '100%',
  height = '100%',
  animate = '1s',
  animateWidth = '100vw',
  minWidth,
  minHeight,
  ...props
}) => {
  const style = {
    ...props.style,
    minWidth,
    minHeight,
    width: width,
    height: height,
    '--animate': animate,
    '--animate-width': animateWidth,
  };
  if (type == TYPES.SHIMMER.TEXT)
    return <Small {...props} style={style} width={width} />;
  return <Shine {...props} style={style} />;
};

const Shine = ({ style }) => <div className={styles.glare} style={style} />;

const Small = (props) => {
  const style = { ...props.style, minHeight: '0.75rem', maxHeight: '0.75rem' };
  return (
    <div
      className={styles.smallTextShimmer}
      style={{ width: props.width, minWidth: props.style.minWidth }}>
      <Shine style={{ ...style, width: '60%' }} />
      <Shine style={{ ...style, width: '82%' }} />
      <Shine style={{ ...style, width: '90%' }} />
    </div>
  );
};

export default Shimmer;
