import {
  HousingConsumptionDataFilter,
  GetHousingConsumptionDataFormik,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionFilterProps = {
  setFilter: (filter: GetHousingConsumptionDataFormik) => void;
  filter: Partial<HousingConsumptionDataFilter> | null;
};
