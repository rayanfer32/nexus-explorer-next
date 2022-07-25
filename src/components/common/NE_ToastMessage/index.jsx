import Image from 'next/image';
import styles from './ToastMessage.module.scss';
import PropTypes from 'prop-types';
import { cls } from 'utils';

/**
 * ToastMessage
 * @param {string} title - Title of the toast message
 * @param {string} message - Message of the toast message
 * @param {string} type - Type of the toast message
 * @param {string} icon - Icon of the toast message
 * @param {number} duration - Duration of the toast message
 * @param {Function} onClose - Colapse the toast message
 * @param {boolean} autoDelete - Auto delete the toast message
 * @returns Component
 */
const ToastMessage = ({
  title,
  message,
  children,
  type = 'default',
  icon,
  duration = 5000,
  onClose,
  autoDelete = true,
  ...props
}) => {
  const animationDuration = `${duration / 1000 - 0.8}s`;
  const messageBody = message ?? children;
  const Icon =
    typeof icon == 'string' ? (
      <Image src={icon} alt="toast icon" width={40} height={40} />
    ) : (
      icon
    );

  return (
    <>
      <div
        className={cls(styles.container, styles[type])}
        style={{ ...props.style, '--duration': animationDuration }}>
        {!autoDelete && (
          <button onClick={onClose} className={styles.close}>
            x
          </button>
        )}
        {Icon && (
          <span className={styles.container__icon}>
            <div className={styles.icon}>{Icon}</div>
            <div className={styles.divider} />
          </span>
        )}
        <span>
          <div className={styles.title}>{title}</div>
          <div className={styles.message}>{messageBody}</div>
        </span>
      </div>
    </>
  );
};

export default ToastMessage;

ToastMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['default', 'success', 'error', 'warning']),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
  autoDelete: PropTypes.bool,
};
