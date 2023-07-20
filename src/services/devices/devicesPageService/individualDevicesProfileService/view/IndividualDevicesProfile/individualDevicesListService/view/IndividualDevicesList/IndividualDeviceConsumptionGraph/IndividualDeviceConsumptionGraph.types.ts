import { EResourceType, IndividualDeviceConsumptionResponse } from 'api/myApi';

export type IndividualDeviceConsumptionGraphProps = {
  resource?: EResourceType;
  data: IndividualDeviceConsumptionResponse[];
};
