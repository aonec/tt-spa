import { EResourceType } from 'myApi';
import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from '../../ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export type SelectResourceConsumptionTypeProps = {
  disabled: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
  checked: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
  setCheckedGraphTypes: (
    selected: BooleanTypesOfResourceConsumptionGraphForTwoMonth
  ) => void;
  resource?: EResourceType;
  isAdditionalAddress: boolean;
};
