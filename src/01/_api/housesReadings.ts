import axios from '../../api/axios';
import {
  HousingStockResponse,
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from '../../api/types';

export const requestDevicesByHouse = async (
  HousingStockId: string
): Promise<IndividualDeviceListItemResponse[]> => {
  const res = await axios.get<any, IndividualDeviceListItemResponsePagedList>(
    `IndividualDevices?HousingStockId=${HousingStockId}&Resource=Electricity`
  );
  return res?.items || [];
};

export const requestHouse = async (HousingStockId: string) => {
  return axios.get<any, HousingStockResponse>(
    `HousingStocks/${HousingStockId}`
  );
};
