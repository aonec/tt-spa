import { EResourceType } from 'myApi';
import { HousingConsumptionDataForTwoMonth } from '../../resourceConsumptionService.types';

export type ResourceConsumptionGraphProps = {
  housingConsumptionData: HousingConsumptionDataForTwoMonth | null;
  resource?: EResourceType ;
};
