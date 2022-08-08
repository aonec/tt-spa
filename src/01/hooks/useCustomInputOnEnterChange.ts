import { useEffect } from 'react';

export const useCustomSwitchOnInputs = (focusOnFirst?: boolean) => {
  const inputList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    `[data-reading-input="current"]`
  );

  const array: HTMLInputElement[] = [];
  for (let i = 0; i < inputList.length; i++) {
    array.push(inputList[i].getElementsByTagName('input')[0] || inputList[i]);
  }

  const firstNode = array[0];
  const onKeyDown = (e: any, index: number, isForced?: boolean) => {
    if (e.key !== 'Enter') return;

    const nextNode = array[index + 1];
    const currentNode = array[index];

    if (!nextNode) {
      const firstNode = array[0];

      firstNode && firstNode.focus && firstNode.focus();
      return;
    }

    currentNode.blur && currentNode.blur();
    nextNode?.focus && nextNode.focus();
  };

  useEffect(() => {
    firstNode && firstNode.focus && firstNode.focus();
  }, [firstNode]);

  return { onKeyDown };
};
