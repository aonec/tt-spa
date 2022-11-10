import { UnloadingType } from '../../closedIndividualDevicesFormService.types';

export const unloadingTypes: { [key in UnloadingType]: string } = {
  [UnloadingType.AllManagingFirm]: 'Выгрузка по всей УК',
  [UnloadingType.ByHouseManagement]: 'Выгрузка по домоуправлению',
  [UnloadingType.ByAddress]: 'Выгрузка по адресу',
};
