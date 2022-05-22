import axios from '01/axios';
import {
  HousingStockResponse,
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'myApi';

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
