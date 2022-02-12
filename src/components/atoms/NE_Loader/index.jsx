import TYPES from 'types';
import CircleLoader from './CircularLoader';
import DotLoader from './DotLoader';
import PropTypes from 'prop-types';

export default function Loader({ type, ...props }) {
  if (type === TYPES.LOADER.DOT) return <DotLoader {...props} />;
  return <CircleLoader {...props} />;
}

Loader.propTypes = {
  type: PropTypes.oneOf(['circle', 'dot']),
  size: PropTypes.string,
  color: PropTypes.string,
};

Loader.defaultProps = {
  type: TYPES.LOADER.CIRCLE,
  size: '3rem',
  color: TYPES.COLORS.NEXUS_BLUE,
};
