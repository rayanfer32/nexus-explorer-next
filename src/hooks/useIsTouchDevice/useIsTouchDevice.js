import { useState, useEffect } from 'react';

// need more work
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
