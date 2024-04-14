'use client'
import React, { useEffect, useState } from 'react';

const KeyboardResponsiveWrapper = ({ children }) => {
  const [viewportHeight, setViewportHeight] = useState(() => {
    if (typeof window!== 'undefined') {
      return window.innerHeight;
    } else {
      return null;
    }
  });

  useEffect(() => {
    const handleWindowResize = () => {
      if (typeof window!== 'undefined') {
        setViewportHeight(window.innerHeight);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    // Return a cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (typeof window!== 'undefined' && window.orientation) {
        setViewportHeight(window.innerHeight);
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    // Return a cleanup function to remove the event listener
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyboardShow = () => {
      if (typeof window!== 'undefined' && document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        setViewportHeight(window.innerHeight - document.activeElement.clientHeight);
      }
    };

    window.addEventListener('keyboardDidShow', handleKeyboardShow);

    // Return a cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keyboardDidShow', handleKeyboardShow);
    };
  }, []);

  return (
    <div style={{ height: `${viewportHeight}px` }}>
      {children}
    </div>
  );
};

export default KeyboardResponsiveWrapper;