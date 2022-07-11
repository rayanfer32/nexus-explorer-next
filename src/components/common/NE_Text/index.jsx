import styles from './Text.module.scss';
import PropType from 'prop-types';

const Text = (props) => {
  return (
    <p className={[styles['text'], styles[`text-${props.type}`]]}>
      {props.children}
    </p>
  );
};

export default Text;

Text.propTypes = {
  type: PropType.oneOf(['primary', 'secondary']),
};

Text.defaultProps = {
  type: 'primary',
};
