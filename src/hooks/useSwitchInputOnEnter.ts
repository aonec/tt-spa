import { useCallback, useEffect } from 'react';

const handleFocus = (node: HTMLInputElement): void => {
  const isInput = node?.tagName === 'INPUT';
  const isTextarea = node?.tagName === 'TEXTAREA';

  if (isTextarea) {
    node?.focus();
    return;
  }

  if (!isInput) {
    const inputList = node?.getElementsByTagName('input');
    inputList?.item(0)?.focus();
    return;
  }

  node?.focus();
  return;
};

const handleBlur = (node: HTMLInputElement): void => {
  const isInput = node?.tagName === 'INPUT';

  if (!isInput) {
    const inputList = node?.getElementsByTagName('input');
    inputList?.item(0)?.blur();
    return;
  }
  node?.blur();
  return;
};

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

      if (nextNode) {
        handleFocus(nextNode);
        return;
      }

      if (isCyclical) {
        const firstNode = inputList[0];

        handleFocus(firstNode);
      } else {
        handleBlur(currentNode);
      }
    },
    [name, isCyclical],
  );

  useEffect(() => {
    if (focusOnFirst) next(-1);
  }, [focusOnFirst, next]);

  return next;
};
