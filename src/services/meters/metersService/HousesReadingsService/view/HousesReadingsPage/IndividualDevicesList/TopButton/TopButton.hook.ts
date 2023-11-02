import { useEffect, useState } from 'react';

export function useUpPage() {
  const [intervalNumber, setIntervalNumber] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY === 0 && intervalNumber) {
        clearInterval(intervalNumber);
        setIntervalNumber(null);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [intervalNumber, setIntervalNumber]);

  return {
    fastUp() {
      window.scrollTo(0, 0);
    },
    slowUp: () => {
      const intervalId = setInterval(() => {
        window.scrollBy({ top: -80, behavior: 'smooth' });
      }, 350);

      setIntervalNumber(intervalId);
    },
    isUpRunnung: Boolean(intervalNumber),
    stopUp() {
      if (intervalNumber) {
        clearInterval(intervalNumber);
        setIntervalNumber(null);
      }
    },
  };
}
