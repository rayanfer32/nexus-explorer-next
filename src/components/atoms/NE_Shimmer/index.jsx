import styles from './Shimmer.module.scss';

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
  width = '100%',
  height = '100%',
  animate = '1s',
  animateWidth = '100vw',
  minWidth,
  minHeight,
}) => {
  const style = {
    minWidth,
    minHeight,
    width: width,
    height: height,
    '--animate': animate,
    '--animate-width': animateWidth,
  };
  return <Shine style={style} />;
};

const Shine = ({ style }) => <div className={styles.glare} style={style} />;

export default Shimmer;
