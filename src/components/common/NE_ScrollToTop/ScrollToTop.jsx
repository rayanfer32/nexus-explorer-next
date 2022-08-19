import { useEffect, useState } from 'react';
import { BsArrowUpShort } from 'react-icons/bs';
import styles from './ScrollToTop.module.scss';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 350 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  //scroll-to-top classes: fixed, bottom:0, right:0
  return (
    <div className={styles.scrollToTop}>
      {isVisible && (
        <div className={styles.scrollToTop__clickAble} onClick={scrollToTop}>
          <BsArrowUpShort />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
