import { TreeSelectElement } from 'ui-kit/shared_components/AddressTreeSelect/AddressTreeSelect.types';
import { PreparedHouseManagements } from '../../../resourceConsumptionService.types';
import { ConsumptionDataFilter } from '../../resourceConsumptionFilterService.types';

export type ResourceConsumptionFilterProps = {
  setFilter: (filter: ConsumptionDataFilter) => void;
  filter: ConsumptionDataFilter;
  selectedHouseManagement: string | null;
  setHouseManagement: (houseManagement: string | null) => void;
  houseManagements: PreparedHouseManagements[];
  handleClearData: () => void;
  handleClearFilter: () => void;
  handleClearAdditionalAddressData: () => void;
  treeData: TreeSelectElement[];
  selectedCity: string | null;
  selectCity: (city: string) => void;
  isLoading: boolean;
};
