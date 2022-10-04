import { useEffect } from 'react';

export const useSwitchInputOnEnter = (name: string, focusOnFirst: boolean) => {
  const next = (index: number) => {
    const inputList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      `[data-reading-input="${name}"]`
    );

    const nextNode = inputList[index + 1];

    if (!nextNode) {
      const firstNode = inputList[0];

      return handleFocus(firstNode);
    }
    return handleFocus(nextNode);
  };

  useEffect(() => {
    if (focusOnFirst) {
      next(-1);
    }
  }, []);

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
