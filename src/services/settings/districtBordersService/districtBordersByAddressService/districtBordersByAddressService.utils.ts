type Coordinates = ({
  latitude: number;
  longitude: number;
} | null)[];

export const getBorderPoints = (coordinates: Coordinates) => {
  let minLat = Infinity,
    maxLat = -Infinity,
    minLong = Infinity,
    maxLong = -Infinity;

  // Find the minimum and maximum latitude and longitude values
  for (let i = 0; i < coordinates.length; i++) {
    const point = coordinates[i];
    if (point !== null) {
      minLat = Math.min(minLat, point.latitude);
      maxLat = Math.max(maxLat, point.latitude);
      minLong = Math.min(minLong, point.longitude);
      maxLong = Math.max(maxLong, point.longitude);
    }
  }

  const perimeterPoints = [];

  // Find the points on the perimeter
  for (let i = 0; i < coordinates.length; i++) {
    const point = coordinates[i];
    if (
      point !== null &&
      (point.latitude === minLat ||
        point.latitude === maxLat ||
        point.longitude === minLong ||
        point.longitude === maxLong)
    ) {
      perimeterPoints.push(point);
    }
  }

  return perimeterPoints;
};
