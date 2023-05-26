import { getLinkToSvg } from 'utils/getLinkToSvg';
import {
  HousingStockPlacemark,
  InactiveHousingStockPlacemark,
} from './CreateDistrictBorderMapPage.constants';

function isPointOnLeftOfLine(
  point: number[],
  xi: number,
  yi: number,
  xj: number,
  yj: number,
) {
  return (
    yi > point[1] !== yj > point[1] &&
    point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi
  );
}

function isPointOnLine(point: number[], x: number, y: number) {
  return point[0] === x && point[1] === y;
}

export function isPointInsidePolygon(
  point: number[],
  polygonVertices: number[][],
) {
  const numberOfVertices = polygonVertices.length;
  let isInside = false;

  // Loop through each vertex of the polygon
  for (let i = 0, j = numberOfVertices - 1; i < numberOfVertices; j = i++) {
    const [xi, yi] = polygonVertices[i];
    const [xj, yj] = polygonVertices[j];

    // Check if the point intersects with the line between the current vertex and the previous vertex
    const intersect = isPointOnLeftOfLine(point, xi, yi, xj, yj);

    if (intersect) {
      // If the point intersects with the line, toggle the isInside flag
      isInside = !isInside;
    } else if (isPointOnLine(point, xi, yi)) {
      // If the point is on the line, return true
      return true;
    }
  }

  // Return whether the point is inside the polygon
  return isInside;
}

export function getHousingStockItemLink(active: boolean) {
  return getLinkToSvg(
    active ? HousingStockPlacemark : InactiveHousingStockPlacemark,
  );
}
