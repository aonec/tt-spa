import {
  AllNodeWorkingRangeResponse,
  ENodeWorkingRangeSeason,
  EResourceType,
  NodeOnHousingStockResponse,
} from 'api/types';
import { TreeSelectElement } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.types';

export type UniqueWorkingRangeProps = {
  housingStockUniqueWorkingRange: AllNodeWorkingRangeResponse | null;
  isLoading: boolean;
  handleOnSearchDataChange: (payload: {
    nodeResourceType: EResourceType;
    season: ENodeWorkingRangeSeason;
    housingStockId: number;
  }) => void;
  setSelectedCity: (payload: string) => void;
  preparedAddresses: TreeSelectElement[];
  existingCities: string[] | null;
  selectedCity: string | null;
  handleFetchNodes: (payload: number) => void;
  nodes: NodeOnHousingStockResponse[] | null;
  handleNodeChoosen: (payload: {
    season: ENodeWorkingRangeSeason;
    nodeId: number;
  }) => void;
};

export type UniqueWorkingRangeType = {
  nodeResourceType: EResourceType;
  season: ENodeWorkingRangeSeason;
  housingStockId: number | null;
  nodeId: number | null;
};
