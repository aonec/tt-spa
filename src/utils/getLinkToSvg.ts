export const getLinkToSvg = (svgText: string) => {
  const iconHrev = 'data:image/svg+xml;base64,' + btoa(svgText);

  return iconHrev;
};
