import React from 'react';
import Portal from '../Portal';
import styles from './modal.module.scss';

// TODO: Currently ont used any where workarround required
// ! there is problem with portal component or modal component
function Modal(props) {
  const { isOpen = false, onClose } = props;

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose && onClose(e);
  };
  return (
    <>
      {isOpen ? (
        <Portal>
          <section className={styles.container}>
            <div className={styles.modal}>
              <div onClick={handleCloseClick} className={styles.close}>
                Close
              </div>
              {props.children}
            </div>
          </section>
        </Portal>
      ) : null}
    </>
  );
}

export default Modal;
