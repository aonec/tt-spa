export const getTaskTextStyle = (isAllActive: boolean) => ({
  fill: isAllActive ? '#272F5A' : '#fff',
  fontSize: '11px',
});

export const getTaskDotStyle = (isAllActive: boolean) => {
  const fill = isAllActive ? 'white' : '#272F5A';
  const stroke = isAllActive ? '#272F5A' : '';
  const strokeWidth = isAllActive ? '1' : '';

  return { fill, stroke, strokeWidth };
};
