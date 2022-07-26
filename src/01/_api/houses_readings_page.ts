import axios from '../../api/axios';
import { IndividualDeviceListItemResponse } from '../../api/types';
import { DisabledStateType } from '../Redux/reducers/readingsReducer';

export type ReadingsStateType = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: Array<IndividualDeviceListItemResponse>;
  nextPageNumber: number;
  pageNumber: number;
  pageSize: number;
  previousPageNumber: number;
  totalItems: number;
  totalPages: number;
  disabledState?: DisabledStateType;
};

export type HouseType = {
  areaOfNonResidential: string | null;
  city: string;
  constructionDate: string | null;
  corpus: null;
  district: string | null;
  houseArea: string | null;
  houseCategory: string | null;
  id: number;
  index: string | null;
  isThereElevator: null;
  number: string;
  numberOfApartments: null;
  numberOfEntrances: null;
  numberOfFloors: null;
  region: null;
  street: string | null;
  totalArea: null;
  totalLivingArea: null;
};

export const requestDevicesByHouse = async (
  HousingStockId: string
): Promise<ReadingsStateType> => {
  const res = await axios.get<any, ReadingsStateType>(
    `IndividualDevices?HousingStockId=${HousingStockId}&Resource=Electricity`
  );
  return res;
};

export const requestHouse = async (HousingStockId: string) => {
  return axios.get<any, HouseType>(`HousingStocks/${HousingStockId}`);
};
