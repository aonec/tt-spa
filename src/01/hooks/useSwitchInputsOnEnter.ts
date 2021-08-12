export const useSwitchOnInputs = () => {
  const onKeyDown = (e: any, index: number) => {
    
    if (e.key !== 'Enter') return;
    
    const inputList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      `[data-reading-input="current"]`
    );

    const currentNode = inputList[index];
    const nextNode = inputList[index + 1];

    const currentInputNode: any = currentNode.getElementsByClassName(
      'ant-input'
    )[0];

    if (!nextNode) return currentInputNode?.blur && currentInputNode.blur();

    const nextInputNode: any = nextNode.getElementsByClassName('ant-input')[0];

    nextInputNode?.focus && nextInputNode.focus();
  };

  return { onKeyDown };
};
