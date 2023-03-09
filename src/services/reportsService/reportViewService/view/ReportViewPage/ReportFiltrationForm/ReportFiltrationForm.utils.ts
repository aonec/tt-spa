import {
  HouseManagementWithStreetsResponse,
  StreetWithHousingStockNumbersResponse,
} from 'myApi';
import { getAddressSearchData } from 'services/resources/resourceConsumptionService/resourceConsumptionService.utils';
import { Address } from './ReportFiltrationForm.types';

export const getAddresses = (
  houseManagements: HouseManagementWithStreetsResponse[],
  selectedHouseManagement?: string | null,
): Address[] => {
  if (!selectedHouseManagement) {
    const streets = houseManagements.reduce(
      (acc, houseManagement) => [...acc, ...(houseManagement.streets || [])],
      [] as StreetWithHousingStockNumbersResponse[],
    );

    return getAddressSearchData(streets);
  }

  const requiredHouseManagements = houseManagements.find(
    (houseManagement) => houseManagement.id === selectedHouseManagement,
  );

  return getAddressSearchData(requiredHouseManagements?.streets || []);
};

export const prepareAddressesTreeData = (
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[],
  selectedHouseManagementId: string | null,
) => {
  const addressesTreeData = addressesWithHouseManagements
    .filter((houseManagement) =>
      selectedHouseManagementId
        ? houseManagement.id === selectedHouseManagementId
        : true,
    )
    .map((houseManagement) => ({
      value: houseManagement.id,
      title: houseManagement.name,
      key: houseManagement.id,
      children:
        houseManagement.streets?.map((street) => ({
          value: `${street.street} ${houseManagement.id}`,
          title: street.street || '',
          key: `${street.street} ${houseManagement.id}`,
          children:
            street.addresses?.map((address) => ({
              value: address.housingStockId,
              key: address.housingStockId,
              title: address.housingStockNumber
                ? `${street.street}, ${address.housingStockNumber}`
                : '',
            })) || [],
        })) || [],
    }));

  return addressesTreeData;
};
