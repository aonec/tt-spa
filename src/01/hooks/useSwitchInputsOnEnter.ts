import { $isCancelSwitchInput } from '01/features/readings/readingsInput/confirmInputReadingModal/models';
import { useStore } from 'effector-react';
import { useEffect } from 'react';

export const useSwitchOnInputs = (focusOnFirst?: boolean) => {
  const isCancelSwitch = useStore($isCancelSwitchInput);

  const onKeyDown = (e: any, index: number, isForced?: boolean) => {
    if (e.key !== 'Enter' && !isForced) return;

    const inputList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      `[data-reading-input="current"]`
    );

    const nextNode = inputList[index + 1];

    if (!nextNode) {
      if (isCancelSwitch) return;

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
  }, []);

  return { onKeyDown, onKeyDownPrevious };
};
