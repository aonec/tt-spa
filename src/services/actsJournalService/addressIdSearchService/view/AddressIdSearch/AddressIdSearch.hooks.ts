import { useMemo } from 'react';

export function useFocusedIndex(dataKey: string) {
  let index: number | null = null;

  const nodeList = useMemo(
    () => document.querySelectorAll(`[data-search-input="${dataKey}"]`),
    [dataKey],
  );

  nodeList.forEach((node, key) => {
    if (document.activeElement === node) {
      index = key;
    }
  });

  return index;
}
