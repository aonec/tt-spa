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
  handleClearFilter: () => void;
  handleClearAdditionalAddress: () => void;
};

export type GetHousingConsumptionDataFormik = {
  HousingStockId: number | null;
  currentAddress: string | null;
  additionalAddress: string | null;
  AdditionalHousingStockId: number | null;
  From: string;
};
