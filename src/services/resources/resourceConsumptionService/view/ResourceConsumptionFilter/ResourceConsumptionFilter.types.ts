import {
  GetConsumptionDataFilter,
  AddressWithSearchString,
  PreparedHouseManagements,
  ConsumptionDataFilter,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionFilterProps = {
  setFilter: (filter: GetConsumptionDataFilter) => void;
  filter: Partial<ConsumptionDataFilter> | null;
  streetsList: AddressWithSearchString[];
  selectedHouseManagement: string;
  setHouseManagement: (houseManagement: string) => void;
  houseManagements: PreparedHouseManagements[];
  handleClearData: () => void;
};

export type GetHousingConsumptionDataFormik = {
  HousingStockId: number | null;
  From: string;
};
