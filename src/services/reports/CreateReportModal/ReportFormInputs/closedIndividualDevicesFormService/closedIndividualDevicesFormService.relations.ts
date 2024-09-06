import { reportsListService } from 'services/reports/reportsListService';
import { sample } from 'effector';
import { closedIndividualDevicesFormService } from './closedIndividualDevicesFormService.model';
import { UnloadingType } from './closedIndividualDevicesFormService.types';

sample({
  clock: reportsListService.inputs.openExistedReport,
  fn: (values) => {
    if (values.houseManagementId !== 'null') {
      return UnloadingType.ByHouseManagement;
    }
    if (values.housingStockId !== 'null') {
      return UnloadingType.ByAddress;
    }
    return UnloadingType.AllManagingFirm;
  },
  target: closedIndividualDevicesFormService.inputs.setUnloadSelectType,
});
