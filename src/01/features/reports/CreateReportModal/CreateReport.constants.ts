import { UnloadingType } from './ReportFormInputs/closedIndividualDevicesFormService/closedIndividualDevicesFormService.types';
import { ReportType } from './types';

export const ZippedReports = [ReportType.CheckingDatesReport];

export const UnloadTypeFieldsDictionary: {
  [key in UnloadingType]: string;
} = {
  [UnloadingType.AllManagingFirm]: 'managementFirmId',
  [UnloadingType.ByAddress]: 'housingStockId',
  [UnloadingType.ByHouseManagement]: 'houseManagementId',
};
