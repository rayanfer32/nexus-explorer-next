import TYPES from 'types';
import CircleLoader from './CircularLoader';
import DotLoader from './DotLoader';
import PropTypes from 'prop-types';

export default function Loader({ type, ...props }) {
  if (type === TYPES.loaderType.dot) return <DotLoader {...props} />;
  return <CircleLoader {...props} />;
}

Loader.prototype = {
  type: PropTypes.oneOf([TYPES.loaderType.circle, TYPES.loaderType.dot]),
  size: PropTypes.string,
  color: PropTypes.string,
};
