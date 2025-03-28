import { axios } from 'api/axios';
import {
  HomeownerAccountSplitRequest,
  IndividualDeviceListItemResponsePagedList,
} from 'api/types';
import { GetIndividualDeviceRequestParams } from './splitPersonalNumberService.types';

export const splitHomeownerAccount = (payload: {
  data: HomeownerAccountSplitRequest;
  isForced?: boolean;
}): Promise<void> =>
  axios.post(
    `HomeownerAccounts/Split?isForced=${payload.isForced || false}`,
    payload.data,
  );

export const doesApartmentExist = ({
  housingStockId,
  apartmentNumber,
}: {
  housingStockId: number;
  apartmentNumber: string;
}): Promise<number | null> =>
  axios.get(
    `HousingStocks/${housingStockId}/doesApartmentExist/${apartmentNumber}`,
  );

export const getIndividualDevices = async (
  params: GetIndividualDeviceRequestParams,
) => {
  const res: IndividualDeviceListItemResponsePagedList = await axios.get(
    'IndividualDevices',
    { params },
  );

  return { items: res?.items || [] };
};
