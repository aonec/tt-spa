export const findPolygonCenter = (polygon: number[][]): [number, number] => {
  const n = polygon.length;
  let sumX = 0;
  let sumY = 0;

  for (let i = 0; i < n; i++) {
    sumX += polygon[i][0];
    sumY += polygon[i][1];
  }

  const centerX = sumX / n;
  const centerY = sumY / n;

  return [centerX, centerY];
};
