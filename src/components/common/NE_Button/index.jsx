import { Keyboard_arrow } from 'assets/icons';
import PropTypes from 'prop-types';
import { cls } from 'utils';
import styles from './Button.module.scss';

const Button = (props) => {
  return (
    <button
      {...props}
      className={cls(
        props.className,
        styles['button'],
        styles[`${props.type}`]
      )}>
      <span className={styles.body}>{props.children}</span>
      {(!!props.icon || props.type === 'tertiary') && (
        <span className={styles.icon}>{props.icon || <Keyboard_arrow />}</span>
      )}
    </button>
  );
};

export default Button;

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']).isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
