import { useEffect, useState } from 'react';

export function useFocusedIndex(dataKey: string) {
  const [nodeList, setNodeList] = useState<NodeListOf<Element>>();

  useEffect(() => {
    const nodeList = document.querySelectorAll(
      `[data-search-input="${dataKey}"]`,
    );

    setNodeList(nodeList);
  }, [dataKey]);

  let index = null;
  if (nodeList) {
    nodeList.forEach((node, key) => {
      if (document.activeElement === node) {
        index = key;
      }
    });
  }

  return index;
}
