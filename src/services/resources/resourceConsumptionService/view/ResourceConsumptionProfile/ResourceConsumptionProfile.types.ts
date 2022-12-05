import { EResourceType } from 'myApi';
import {
  HousingConsumptionDataFilter,
  GetHousingConsumptionDataFormik,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionProfileProps = {
  isLoading: boolean;
  resourceConsumptionFilter: Partial<HousingConsumptionDataFilter> | null;
  setFilter: (filter: GetHousingConsumptionDataFormik) => void;
  setResource: (resource: EResourceType) => void;
};
