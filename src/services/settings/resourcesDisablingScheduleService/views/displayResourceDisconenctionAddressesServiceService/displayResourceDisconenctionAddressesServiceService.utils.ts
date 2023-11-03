import { BuildingShortResponse } from 'api/types';
import { groupBy } from 'lodash';
import { StreetWithBuildings } from './views/AddressesList/AddressesList.types';

export const prepareAddresses = (buildings: BuildingShortResponse[]) => {
  const preparedHousingStocks = groupBy(
    buildings,
    'address.mainAddress.street',
  );

  const result = Object.entries(preparedHousingStocks).reduce(
    (acc, [key, buildings]) => {
      const addresses = buildings.map((elem) => ({
        number: elem.address?.mainAddress?.number || null,
        corpus: elem.address?.mainAddress?.corpus || null,
      }));

      return [...acc, { street: key, addresses }];
    },
    [] as StreetWithBuildings[],
  );

  return result;
};
