import { EResourceType, IndividualDeviceConsumptionResponse } from 'api/types';

export type IndividualDeviceConsumptionGraphProps = {
  resource?: EResourceType;
  data: IndividualDeviceConsumptionResponse[];
};
