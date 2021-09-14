import axios from '01/axios';

export const requestDevicesByHouse = async (
  HousingStockId: string
): Promise<ReadingsStateType> => {
  const res = await axios.get<any, ReadingsStateType>(
    `IndividualDevices?HousingStockId=${HousingStockId}&Resource=Electricity`
  );
  return res.items;
};

export const requestHouse = async (HousingStockId: string) => {
  return axios.get<any, HouseType>(`HousingStocks/${HousingStockId}`);
};
