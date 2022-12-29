import { useState } from 'react';

export function useUpPage() {
  const [intervalNumber, setIntervalNumber] = useState<number | null>(null);

  return {
    fastUp() {
      window.scrollTo(0, 0);
    },
    slowUp: () => {
      const intervalId = setInterval(() => {
        window.scrollBy(0, -2);

        if (window.scrollY === 0 && intervalNumber) {
          clearInterval(intervalNumber);
          setIntervalNumber(null);
        }
      }, 1);

      setIntervalNumber(intervalId as any);
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
