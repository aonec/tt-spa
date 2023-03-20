import { TreeSelectElement } from 'ui-kit/shared_components/AddressTreeSelect/AddressTreeSelect.types';
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
  selectedHouseManagement: string | null;
  setHouseManagement: (houseManagement: string | null) => void;
  houseManagements: PreparedHouseManagements[];
  handleClearData: () => void;
  handleClearFilter: () => void;
  handleClearAdditionalAddressData: () => void;
  treeData: TreeSelectElement[];
  selectedCity: string | null;
  selectCity: (city: string) => void;
};
