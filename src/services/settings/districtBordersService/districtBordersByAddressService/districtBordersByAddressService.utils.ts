// type Coordinates = ({
//   latitude: number;
//   longitude: number;
// } | null)[];

// export const getBorderPoints = (coordinates: Coordinates) => {
//   const filteredCoordinates = coordinates.filter(
//     (data) => data?.latitude && data.longitude,
//   );

//   let minLat = Infinity,
//     maxLat = -Infinity,
//     minLong = Infinity,
//     maxLong = -Infinity;

//   // Find the minimum and maximum latitude and longitude values
//   for (let i = 0; i < filteredCoordinates.length; i++) {
//     const point = filteredCoordinates[i];
//     if (point !== null) {
//       minLat = Math.min(minLat, point.latitude);
//       maxLat = Math.max(maxLat, point.latitude);
//       minLong = Math.min(minLong, point.longitude);
//       maxLong = Math.max(maxLong, point.longitude);
//     }
//   }

//   const perimeterPoints = [];

//   // Find the points on the perimeter
//   for (let i = 0; i < filteredCoordinates.length; i++) {
//     const point = filteredCoordinates[i];
//     if (
//       point !== null &&
//       (point.latitude === minLat ||
//         point.latitude === maxLat ||
//         point.longitude === minLong ||
//         point.longitude === maxLong)
//     ) {
//       perimeterPoints.push(point);
//     }
//   }

//   return perimeterPoints;
// };

// function convexHull(points: {latitude: number, longitude: number}[]): {latitude: number, longitude: number}[] {
//   const hull = convexHull2D(points.map(point => [point.longitude, point.latitude]));
//   const result = [];
//   for (let i = 0; i < points.length; i++) {
//     if (isInsideConvexHull(hull, [points[i].longitude, points[i].latitude])) {
//       result.push(points[i]);
//     }
//   }
//   return result;
// }

type Point = {
  latitude: number;
  longitude: number;
};

// Функция, определяющая, лежит ли точка p1 левее точки p2 относительно точки p0
function isLeftTurn(p0: Point, p1: Point, p2: Point): boolean {
  const crossProduct =
    (p1.latitude - p0.latitude) * (p2.longitude - p0.longitude) -
    (p2.latitude - p0.latitude) * (p1.longitude - p0.longitude);
  return crossProduct > 0;
}

export const getConvexHull = (points: Point[]): Point[] => {
  // Сортировка точек по возрастанию широты, а затем по возрастанию долготы
  const sortedPoints = points.sort((a, b) => {
    if (a.latitude !== b.latitude) {
      return a.latitude - b.latitude;
    } else {
      return a.longitude - b.longitude;
    }
  });

  const n = sortedPoints.length;
  const hull: Point[] = [];

  let i = 0;
  let j = 0;

  // Нижняя оболочка
  for (i = 0; i < n; i++) {
    while (j >= 2 && !isLeftTurn(hull[j - 2], hull[j - 1], sortedPoints[i])) {
      hull.pop();
      j--;
    }
    hull.push(sortedPoints[i]);
    j++;
  }

  // Верхняя оболочка
  const t = j + 1;
  for (i = n - 2; i >= 0; i--) {
    while (j >= t && !isLeftTurn(hull[j - 2], hull[j - 1], sortedPoints[i])) {
      hull.pop();
      j--;
    }
    hull.push(sortedPoints[i]);
    j++;
  }

  // Удалить последнюю точку, так как она является дубликатом первой точки
  hull.pop();

  return hull;
};

const data = [
  { latitude: 55.648946, longitude: 51.808888 },
  { latitude: 55.652192, longitude: 51.816407 },
  { latitude: 55.649418, longitude: 51.812867 },
  { latitude: 55.648057, longitude: 51.805762 },
  { latitude: 55.645243, longitude: 51.807055 },
  { latitude: 55.646762, longitude: 51.803327 },
  { latitude: 55.644984, longitude: 51.803695 },
  { latitude: 55.650262, longitude: 51.810711 },
  { latitude: 55.64731, longitude: 51.80949 },
  { latitude: 55.648819, longitude: 51.807388 },
  { latitude: 55.646538, longitude: 51.805474 },
  { latitude: 55.651222, longitude: 51.812382 },
  { latitude: 55.64825, longitude: 51.81134 },
  { latitude: 55.650546, longitude: 51.814835 },
  { latitude: 55.651948, longitude: 51.818338 },
  { latitude: 55.650709, longitude: 51.817646 },
  { latitude: 55.65109, longitude: 51.810837 },
  { latitude: 55.651867, longitude: 51.809543 },
  { latitude: 55.650002, longitude: 51.807801 },
  { latitude: 55.653335, longitude: 51.814251 },
  { latitude: 55.653406, longitude: 51.815634 },
  { latitude: 55.652527, longitude: 51.814161 },
  { latitude: 55.652126, longitude: 51.812364 },
  { latitude: 55.650196, longitude: 51.80878 },
  { latitude: 55.65206, longitude: 51.811071 },
  { latitude: 55.651633, longitude: 51.811286 },
  { latitude: 55.649855, longitude: 51.808915 },
  { latitude: 55.646873, longitude: 51.804441 },
  { latitude: 55.652476, longitude: 51.812256 },
  { latitude: 55.652415, longitude: 51.811466 },
  { latitude: 55.649373, longitude: 51.807837 },
];

const hull = getConvexHull(data);

// Check if all points are inside the convex hull
for (const point of data) {
  if (!isInsideConvexHull(point, hull)) {
    console.log('Error: not all points are inside the convex hull');
    break;
  }
}

// Helper function to check if a point is inside a convex hull
function isInsideConvexHull(point: Point, hull: Point[]): boolean {
  // Helper function to calculate the cross product of three points
  function crossProduct(p1: Point, p2: Point, p3: Point): number {
    return (
      (p2.latitude - p1.latitude) * (p3.longitude - p2.longitude) -
      (p2.longitude - p1.longitude) * (p3.latitude - p2.latitude)
    );
  }

  // Check if the point is inside the convex hull
  for (let i = 1; i < hull.length; i++) {
    if (crossProduct(hull[i - 1], hull[i], point) < 0) {
      return false;
    }
  }

  return true;
}
