import TYPES from 'types';
import styles from './Loader.module.scss';
import PropTypes from 'prop-types';
import { cls } from 'utils';

// TODO: Delete `CircleLoader` once succefull implimentaion
export const CircleLoader = ({
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

CircleLoader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export const CircleLoaderSvg = ({
  size = 48,
  color = TYPES.COLORS.NEXUS_BLUE,
  primary = true,
}) => {
  if (primary)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          opacity=".25"
          fill={color}
        />
        <path
          fill={color}
          d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="0.75s"
            values="0 12 12;360 12 12"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    );
  return (
    <svg
      width={size}
      height={size}
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round">
          <animate
            attributeName="stroke-dasharray"
            dur="1.5s"
            calcMode="spline"
            values="0 150;42 150;42 150;42 150"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="1.5s"
            calcMode="spline"
            values="0;-16;-59;-59"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="2s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
};
