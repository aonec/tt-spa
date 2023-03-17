import { EResourceType, IndividualDeviceConsumptionResponse } from 'myApi';

export type IndividualDeviceConsumptionGraphProps = {
  resource?: EResourceType;
  data: IndividualDeviceConsumptionResponse[];
};
