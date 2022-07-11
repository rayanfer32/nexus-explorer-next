import ToastMessage from '../common/NE_ToastMessage';
import { useState, useEffect } from 'react';
import styles from './Toast.module.scss';
import PropTypes, { element, node, number, string } from 'prop-types';

const ToastListType = {
  id: PropTypes.oneOfType([number, string]),
  title: PropTypes.string,
  message: PropTypes.oneOfType([string, node]),
  children: PropTypes.node,
  type: PropTypes.oneOf(['default', 'success', 'error', 'warning']),
  icon: PropTypes.oneOfType([string, element]),
};

/**
 *
 * @param {Array} toastList Array of toast Messages
 * @param {Number} duration Duration of the toast message
 * @returns
 */
const Toast = ({ toastList = [], autoDelete = true, duration = 4000 }) => {
  const [list, setList] = useState(() => {
    return toastList;
  });

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, duration, list]);

  /**
   * deleteToast
   * @param {*} id number or string
   * @returns
   */
  const deleteToast = (id) => {
    if (!id) {
      toastList.shift();
      const newList = list;
      newList.shift();
      setList([...newList]);
      return;
    }
    const toastListItem = toastList.findIndex((item) => item.id === id);
    toastList.splice(toastListItem, 1);
    setList(list.filter((item) => item.id !== id));
  };

  /**
   * onClose
   * @param {string|number} id id of the toast message
   */
  const onClose = (id) => {
    deleteToast(id) || false;
  };

  return (
    <div className={styles.toast__container}>
      {list.map((toast, idx) => (
        <ToastMessage
          {...toast}
          duration={duration}
          key={idx}
          autoDelete={autoDelete}
          onClose={() => onClose(toast?.id)}
        />
      ))}
    </div>
  );
};

export default Toast;

Toast.propTypes = {
  toastList: PropTypes.arrayOf(PropTypes.shape(ToastListType)).isRequired,
  autoDelete: PropTypes.bool,
  duration: PropTypes.number,
};
