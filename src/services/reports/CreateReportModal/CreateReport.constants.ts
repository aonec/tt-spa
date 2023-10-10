import { UnloadingType } from './ReportFormInputs/closedIndividualDevicesFormService/closedIndividualDevicesFormService.types';

export const UnloadTypeFieldsDictionary: {
  [key in UnloadingType]: string;
} = {
  [UnloadingType.AllManagingFirm]: 'managementFirmId',
  [UnloadingType.ByAddress]: 'housingStockId',
  [UnloadingType.ByHouseManagement]: 'houseManagementId',
};
