import { IndividualDeviceListItemResponse } from 'api/myApi';
import { TransferStage } from 'services/homeowner/personalNumber/splitPersonalNumberService/splitPersonalNumberService.types';

export type TransferDevicesStageProps = {
  individualDevices: {
    items: IndividualDeviceListItemResponse[];
  } | null;
  transferDevicesData: TransferStage | null;
  handleSubmitTransferDevicesStage: (payload: TransferStage) => void;
  formId: string;
};
