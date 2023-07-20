import { IndividualDeviceResponseFromDevicePage } from 'api/myApi';
import { IndividualDeviceConsumptionGraphType } from '../../individualDevicesListService.constants';
import { IndividualDeviceConsumptionForGraph } from '../../individualDevicesListService.types';

export type IndividualDevicesListProps = {
  isLoading: boolean;
  individualDevicesList: IndividualDeviceResponseFromDevicePage[] | null;
  apartmentId?: number;
  selectedGraphType: IndividualDeviceConsumptionGraphType;
  selectGraphType: (type: IndividualDeviceConsumptionGraphType) => void;
  graphData: IndividualDeviceConsumptionForGraph[];
  isConsumptionsLoading: boolean;
};
