import {
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
} from 'myApi';

export type ReportFiltrationFormProps = {
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
};

export type Address = {
  id: number;
  addressString: string;
};
