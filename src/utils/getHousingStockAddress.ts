import { DevicesByAddressInterface } from '01/_pages/Devices/components/utils/groupDevicesByObjects';
import {
  HouseAddress,
  HousingStockListResponse,
  HousingStockShortResponse,
} from 'myApi';

export const getHousingStockAddress = (
  housingStock:
    | HousingStockListResponse
    | DevicesByAddressInterface
    | HousingStockShortResponse
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
