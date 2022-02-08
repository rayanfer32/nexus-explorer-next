import { useState, useEffect } from 'react';

/**
 * getisMobile
 * @returns {boolean}
 */
const getIsMobile = () =>
  window.innerWidth <= 768 || !!window?.navigator?.userAgentData?.mobile;

/**
 * useIsMobile
 * @returns {boolean}
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobile;
};
