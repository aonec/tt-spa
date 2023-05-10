import { axios } from '01/axios';
import { HomeownerAccountSplitRequest } from 'myApi';

export const splitHomeownerAccount = (payload: {
  data: HomeownerAccountSplitRequest;
  isForced?: boolean;
}): Promise<void> =>
  axios.post(
    `HomeownerAccounts/Split?isForced=${payload.isForced || false}`,
    payload.data,
  );

export const doesApartmentExist = async ({
  housingStockId,
  apartmentNumber,
}: {
  housingStockId: number;
  apartmentNumber: string;
}): Promise<number | null> => {
  const res: any = await axios.get(
    `HousingStocks/${housingStockId}/doesApartmentExist/${apartmentNumber}`,
  );

  if (typeof res === 'number') return res;

  return res?.successResponse;
};
