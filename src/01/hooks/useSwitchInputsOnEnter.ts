import { useEffect } from 'react';

export const useSwitchOnInputs = (focusOnFirst?: boolean) => {
  const onKeyDown = (e: any, index: number, isForced?: boolean) => {
    if (e.key !== 'Enter' && !isForced) return;

    const inputList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      `[data-reading-input="current"]`
    );

    const nextNode = inputList[index + 1];

    if (!nextNode) {
      const firstNode = inputList[0];

      const neededInputNode: any = firstNode?.getElementsByClassName(
        'ant-input'
      )[0];

      neededInputNode && neededInputNode.focus && neededInputNode.focus();
      return;
    }

    const nextInputNode: any = nextNode?.getElementsByClassName('ant-input')[0];

    nextInputNode?.focus && nextInputNode.focus();
  };

  const onKeyDownPrevious = (e: any) => e.key === 'Enter' && e.target?.blur();

  useEffect(() => {
    if (focusOnFirst) {
      onKeyDown({}, -1, true);
    }
  }, [focusOnFirst]);

  return { onKeyDown, onKeyDownPrevious };
};
