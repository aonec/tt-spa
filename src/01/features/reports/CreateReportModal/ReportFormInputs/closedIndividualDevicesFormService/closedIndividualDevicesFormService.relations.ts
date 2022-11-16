import { reportsListService } from '01/features/reports/reportsListService';
import { sample } from 'effector';
import { closedIndividualDevicesFormService } from './closedIndividualDevicesFormService.model';
import { UnloadingType } from './closedIndividualDevicesFormService.types';

sample({
  clock: reportsListService.inputs.openExistedReport,
  fn: (values) => {
        console.log(values);
        console.log(values.houseManagementId);
        console.log(values.housingStockId);
    if (values.houseManagementId) {
      return UnloadingType.ByHouseManagement;
    }
    if (values.housingStockId) {
      console.log(values.housingStockId);
      return UnloadingType.ByAddress;
    }

    return UnloadingType.AllManagingFirm;
  },
  target: closedIndividualDevicesFormService.inputs.setUnloadSelectType,
});
