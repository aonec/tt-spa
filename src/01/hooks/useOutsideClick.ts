import { EventHandler, RefObject, useCallback, useEffect } from 'react';

const useOutsideClick = (ref: RefObject<any>, callback: () => void) => {
  const handleClick = (e: any) => {
    // e.preventDefault();
    e.stopImmediatePropagation();

    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }
    callback();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export default useOutsideClick;
