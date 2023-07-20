import { EResourceType } from 'api/myApi';
import {
  BooleanTypesOfResourceConsumptionGraphForTwoMonth,
  SelectedAddresses,
} from '../../ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export type SelectResourceConsumptionTypeProps = {
  disabled: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
  checked: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
  setCheckedGraphTypes: (
    selected: BooleanTypesOfResourceConsumptionGraphForTwoMonth,
  ) => void;
  resource?: EResourceType;
  isAdditionalAddress: boolean;
  additionalAddress: string;
  currentAddress: string;
  selectedAddresses: SelectedAddresses;
  setSelectedAddresses: (payload: SelectedAddresses) => void;
};
