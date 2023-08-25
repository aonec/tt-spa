import { WorkWithIndividualDeviceType } from '../../workWithIndividualDeviceService.types';

export const WorkWithIndividualDevicePageTitle: {
  [key in WorkWithIndividualDeviceType]: string;
} = {
  [WorkWithIndividualDeviceType.check]: 'Поверка прибора',
  [WorkWithIndividualDeviceType.reopen]: 'Переоткрытие прибора',
  [WorkWithIndividualDeviceType.switch]: 'Замена прибора',
};
