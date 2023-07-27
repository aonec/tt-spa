import { EResourceType } from 'api/types';
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
  isHousingLoading: boolean;
  isNormativeAndSubscriberLoading: boolean;
  isPrevHousingLoading: boolean;
  isPrevNormativeAndSubscriberLoading: boolean;
};
