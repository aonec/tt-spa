import { IndividualDeviceResponseFromDevicePage } from 'myApi';
import { IndividualDeviceConsumptionGraphType } from '../../individualDevicesListService.constants';

export type IndividualDevicesListProps = {
  isLoading: boolean;
  individualDevicesList: IndividualDeviceResponseFromDevicePage[] | null;
  apartmentId?: number;
  selectedGraphType: IndividualDeviceConsumptionGraphType;
  selectGraphType: (type: IndividualDeviceConsumptionGraphType) => void;
  graphData: { consumption: number; date: string }[];
};
