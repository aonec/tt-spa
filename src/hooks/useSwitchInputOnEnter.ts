import { useCallback, useEffect } from 'react';

export const useSwitchInputOnEnter = (
  name: string,
  focusOnFirst: boolean,
  isCyclical = true,
) => {
  const next = useCallback(
    (index: number) => {
      const inputList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
        `[data-reading-input="${name}"]`,
      );

      if (!inputList.length) {
        return null;
      }

      const nextNode = inputList[index + 1];

      const currentNode = inputList[index];

      if (!nextNode && isCyclical) {
        const firstNode = inputList[0];

        return handleFocus(firstNode);
      }
      if (!nextNode && !isCyclical) {
        return handleBlur(currentNode);
      }
      
      return handleFocus(nextNode);
    },
    [name, isCyclical],
  );

  useEffect(() => {
    if (focusOnFirst) {
      next(-1);
    }
  }, [focusOnFirst, next]);

  return next;
};

const handleFocus = (node: HTMLInputElement): void => {
  const isInput = node.tagName === 'INPUT';

  if (!isInput) {
    const inputList = node.getElementsByTagName('input');
    return inputList.item(0)?.focus();
  }
  return node.focus();
};

const handleBlur = (node: HTMLInputElement): void => {
  const isInput = node.tagName === 'INPUT';

  if (!isInput) {
    const inputList = node.getElementsByTagName('input');
    return inputList.item(0)?.blur();
  }
  return node.blur();
};
