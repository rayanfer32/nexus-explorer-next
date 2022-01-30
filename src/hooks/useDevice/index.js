import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(!!window?.navigator?.userAgentData?.mobile);
  }, []);
  return isMobile;
};

export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(
      !!(
        window?.navigator?.maxTouchPoints ||
        'ontouchstart' in document.documentElement
      )
    );
  }, []);
  return isTouch;
};
