import {
  HouseManagementWithStreetsResponse,
  StreetWithHousingStockNumbersResponse,
} from 'myApi';
import { getAddressSearchData } from 'services/resources/resourceConsumptionService/resourceConsumptionService.utils';
import { Address } from './ReportFiltrationForm.types';

export const getAddresses = (
  houseManagements: HouseManagementWithStreetsResponse[],
  selectedHouseManagement?: string | null
): Address[] => {
  if (!selectedHouseManagement) {
    const streets = houseManagements.reduce(
      (acc, houseManagement) => [...acc, ...(houseManagement.streets || [])],
      [] as StreetWithHousingStockNumbersResponse[]
    );

    return getAddressSearchData(streets);
  }

  const requiredHouseManagements = houseManagements.find(
    (houseManagement) => houseManagement.id === selectedHouseManagement
  );

  return getAddressSearchData(requiredHouseManagements?.streets || []);
};
