import { useRef, useEffect } from 'react'
import styles from './rail.module.css';

const Rail = (props) => {
  const railRef = useRef(null);
  const scrollSpeed = typeof props.scrollSpeed === 'number' ? props.scrollSpeed : 1;

  useEffect(() => {
    const el = railRef.current;
    const onWheel = e => {
      if (e.deltaY == 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + (e.deltaY * scrollSpeed),
        behavior: "smooth" // "smooth" or "auto"
      });
    };
    if (el) {
      el.addEventListener("wheel", onWheel);
    }
    return () => el && el.removeEventListener("wheel", onWheel);
  }, []);

  return (<main className={[props.className, styles.railContainer].join(' ')} ref={railRef}>
    {props.children}
  </main>);
}
export default Rail;