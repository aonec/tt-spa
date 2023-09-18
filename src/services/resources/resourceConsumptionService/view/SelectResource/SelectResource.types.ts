import {
  EResourceType,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'api/types';

export type SelectResourceProps = {
  selectedResource: EResourceType | null;
  setResource: (resource: EResourceType) => void;
  summaryConsumption: GetSummaryHousingConsumptionsByResourcesResponse | null;
  isSummaryLoading: boolean;
};
