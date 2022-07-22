import { DevicesByAddressInterface } from '01/_pages/Devices/components/utils/groupDevicesByObjects';
import {
  HousingStockAddressResponse,
  HousingStockListResponse,
  HousingStockShortResponse,
} from 'myApi';

export const getHousingStockAddress = (
  housingStock:
    | HousingStockListResponse
    | DevicesByAddressInterface
    | HousingStockShortResponse
    | null,
  isCityNeeded?: boolean
) => {
  if (!housingStock) return null;

  const { city, corpus, street, number } =
    housingStock.address?.mainAddress || {};
  const cityText = isCityNeeded ? `${city},` : '';
  const corpusText = corpus ? `, корпус ${corpus}` : '';

  return `${cityText} ${street}, ${number}${corpusText}`;
};
