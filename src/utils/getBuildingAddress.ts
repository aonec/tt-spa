import {
  BuildingShortResponse,
  HouseAddress,
  HousingStockListResponse,
  HousingStockResponse,
  NonResidentialBuildingResponse,
} from 'api/myApi';
import { DevicesByAddressInterface } from 'services/devices/displayDevicesService/displayDevicesService.types';

export const getBuildingAddress = (
  housingStock:
    | HousingStockListResponse
    | DevicesByAddressInterface
    | HousingStockResponse
    | NonResidentialBuildingResponse
    | BuildingShortResponse
    | null,
  isCityNeeded?: boolean,
) => {
  if (!housingStock) return null;

  const { city, corpus, street, number } =
    housingStock.address?.mainAddress || {};
  const cityText = isCityNeeded ? `${city},` : '';
  const corpusText = corpus ? `, корпус ${corpus}` : '';

  return `${cityText} ${street}, ${number}${corpusText}`;
};

export const getHousingStockAddressString = (address?: HouseAddress | null) => {
  if (!address) {
    return '';
  }
  const { street, houseNumber, houseCorpus } = address;
  const corpusText = houseCorpus ? `, корпус ${houseCorpus}` : '';

  return `ул. ${street}, ${houseNumber}${corpusText}`;
};
