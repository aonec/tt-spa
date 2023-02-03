import { useCallback, useEffect } from 'react';

export const useSwitchInputOnEnter = (name: string, focusOnFirst: boolean) => {
  const next = useCallback(
    (index: number) => {
      const inputList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
        `[data-reading-input="${name}"]`,
      );
      const nextNode = inputList[index + 1];

      if (!nextNode) {
        const firstNode = inputList[0];

        if (!firstNode?.focus) return;

        return firstNode.focus();
      }

      if (nextNode?.focus) nextNode.focus();
    },
    [name],
  );

  useEffect(() => {
    if (focusOnFirst) {
      next(-1);
    }
  }, [focusOnFirst, next]);

  return next;
};
