import {
  EResourceType,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'myApi';

export type SelectResourceProps = {
  selectedResource: EResourceType | null;
  setResource: (resource: EResourceType) => void;
  summaryConsumption: GetSummaryHousingConsumptionsByResourcesResponse | null;
};
