import { useRef, useEffect } from 'react';
import styles from './rail.module.scss';
import PropTypes from 'prop-types';
import { cls } from 'utils';

const Rail = (props) => {
  const railRef = useRef(null);
  const scrollSpeed =
    typeof props.scrollSpeed === 'number' ? props.scrollSpeed : 1;

  useEffect(() => {
    const el = railRef.current;
    const onWheel = (e) => {
      if (e.deltaY == 0) return;
      if (window.innerWidth < 1180) {
        e.preventDefault();
      }
      // if(window.innerWidth > 768) return;
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * scrollSpeed,
        behavior: 'smooth', // "smooth" or "auto"
      });
    };
    if (el) {
      el.addEventListener('wheel', onWheel);
    }
    return () => el && el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <main className={cls(props.className, styles.railContainer)} ref={railRef}>
      {props.children}
    </main>
  );
};

Rail.propTypes = {
  scrollSpeed: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Rail;
