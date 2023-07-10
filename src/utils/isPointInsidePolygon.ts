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
  polygonVertices: number[][] = [],
) {
  const numberOfVertices = polygonVertices.length;
  let isInside = false;

  // Проходимся по каждой вершине многоугольника
  for (let i = 0, j = numberOfVertices - 1; i < numberOfVertices; j = i++) {
    const [xi, yi] = polygonVertices[i];
    const [xj, yj] = polygonVertices[j];

    // Проверяем, пересекает ли точка линию между текущей и предыдущей вершинами
    const intersect = isPointOnLeftOfLine(point, xi, yi, xj, yj);

    if (intersect) {
      // Если точка пересекает линию, меняем значение флага isInside
      isInside = !isInside;
    } else if (isPointOnLine(point, xi, yi)) {
      // Если точка лежит на линии, возвращаем true
      return true;
    }
  }

  // Возвращаем, находится ли точка внутри многоугольника
  return isInside;
}
