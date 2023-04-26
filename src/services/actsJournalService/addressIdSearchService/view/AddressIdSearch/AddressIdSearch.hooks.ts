export function getFocusedIndex(dataKey: string) {
  let index = null;

  const nodeList = document.querySelectorAll(
    `[data-search-input="${dataKey}"]`,
  );

  console.log(nodeList);

  nodeList.forEach((node, key) => {
    if (document.activeElement === node) {
      index = key;
    }
  });

  return index;
}
