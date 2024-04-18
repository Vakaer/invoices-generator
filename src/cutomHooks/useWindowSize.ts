import { useState, useEffect } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

const useWindowSize = (): WindowSize => {
  // Check if the code is running in a browser environment
  const isBrowser = typeof window !== 'undefined';

  const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  }));

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (isBrowser) {
      // Add event listener to track window size changes
      window.addEventListener('resize', handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isBrowser]);

  return windowSize;
};

export default useWindowSize;
