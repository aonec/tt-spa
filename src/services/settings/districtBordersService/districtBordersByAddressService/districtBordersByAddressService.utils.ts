import { StreetWithBuildingNumbersResponse } from 'api/types';
import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
  Coordinate,
  FilterType,
} from './districtBordersByAddressService.types';

// Функция, определяющая, лежит ли точка p1 левее точки p2 относительно точки p0
function isLeftTurn(p0: Coordinate, p1: Coordinate, p2: Coordinate): boolean {
  const crossProduct =
    (p1.latitude - p0.latitude) * (p2.longitude - p0.longitude) -
    (p2.latitude - p0.latitude) * (p1.longitude - p0.longitude);
  return crossProduct > 0;
}

export const getConvexHull = (points: Coordinate[]): Coordinate[] => {
  const filteredPoints = points.filter(
    (data) => data?.latitude && data.longitude,
  );

  // Сортировка точек по возрастанию широты, а затем по возрастанию долготы
  const sortedPoints = filteredPoints.sort((a, b) => {
    if (a.latitude !== b.latitude) {
      return a.latitude - b.latitude;
    } else {
      return a.longitude - b.longitude;
    }
  });

  const n = sortedPoints.length;
  const hull: Coordinate[] = [];

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

type Polygon = [number, number][];

export const findPolygonCenter = (polygon: Polygon): [number, number] => {
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

export const getFilteredAddresses = (
  addresses: StreetWithBuildingNumbersResponse[] | null,
  filterData: FilterType | null,
) => {
  if (!addresses) return [];
  if (!filterData?.street) return addresses;

  if (!filterData.corpus && !filterData.house) {
    return addresses.filter((address) => address.street === filterData.street);
  }

  if (filterData.corpus || filterData.house) {
    const filteredByStreetAddress = addresses.filter(
      (address) => address.street === filterData.street,
    );

    const filteredHouses = filteredByStreetAddress[0].addresses?.filter(
      (address) => {
        if (!filterData.corpus) {
          return address.number === filterData.house;
        }
        if (!filterData.house) {
          return address.corpus === filterData.corpus;
        }
        if (filterData.house && filterData.corpus) {
          return (
            address.corpus === filterData.corpus &&
            address.number === filterData.house
          );
        }
        return true;
      },
    );

    return [
      {
        street: filteredByStreetAddress[0].street,
        addresses: filteredHouses,
      },
    ] as StreetWithBuildingNumbersResponse[];
  }
};

export const addHousingStocksToChecked = (
  prevIdsWithStreet: CheckedHousingStocksIdWithStreets[],
  commingIdsWithStreet: CheckedHousingStocksIdWithStreetsHandler,
) => {
  const street = commingIdsWithStreet.street;

  const isArray = Array.isArray(commingIdsWithStreet.housingStocksId);

  const housingStockByStreetIndex = prevIdsWithStreet.findIndex(
    (elem) => elem.street === street,
  );

  if (housingStockByStreetIndex === -1) {
    return [
      ...prevIdsWithStreet,
      {
        street: street ? street : 'unknown',
        housingStocksId: isArray
          ? commingIdsWithStreet.housingStocksId
          : ([commingIdsWithStreet.housingStocksId] as any),
      },
    ];
  } else {
    if (commingIdsWithStreet.isToAdd) {
      const clonePrevIdsWithStreet = prevIdsWithStreet.slice();

      clonePrevIdsWithStreet[housingStockByStreetIndex] = {
        street: street ? street : 'unknown',
        housingStocksId: isArray
          ? (commingIdsWithStreet.housingStocksId as any)
          : [
              ...prevIdsWithStreet[housingStockByStreetIndex].housingStocksId,
              commingIdsWithStreet.housingStocksId,
            ],
      };

      return clonePrevIdsWithStreet;
    }
    if (!commingIdsWithStreet.isToAdd) {
      const clonePrevIdsWithStreet = prevIdsWithStreet.slice();

      clonePrevIdsWithStreet[housingStockByStreetIndex] = {
        street: street ? street : 'unknown',
        housingStocksId: isArray
          ? []
          : prevIdsWithStreet[housingStockByStreetIndex].housingStocksId.filter(
              (housingStockId) =>
                housingStockId !== commingIdsWithStreet.housingStocksId,
            ),
      };
      return clonePrevIdsWithStreet;
    }
  }
};
