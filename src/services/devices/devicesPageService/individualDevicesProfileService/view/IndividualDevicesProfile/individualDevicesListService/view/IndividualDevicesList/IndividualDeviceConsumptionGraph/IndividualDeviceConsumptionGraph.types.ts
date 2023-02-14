import { EResourceType } from 'myApi';
import { Consumption } from '../IndividualDeviceListItem/IndividualDeviceListItem.types';

export type IndividualDeviceConsumptionGraphProps = {
  resource?: EResourceType;
  data: Consumption[];
};
