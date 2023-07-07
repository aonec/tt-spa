import { WorkWithIndividualDeviceType } from '../../../workWithIndividualDeviceService.types';

export const OldIndividualDeviceTitleLookup: {
  [key in WorkWithIndividualDeviceType]: string;
} = {
  [WorkWithIndividualDeviceType.check]: '',
  [WorkWithIndividualDeviceType.reopen]: 'Прибор до переоткрытия',
  [WorkWithIndividualDeviceType.switch]: 'Заменяемый прибор',
};

export const NewIndividualDeviceTitleLookup: {
  [key in WorkWithIndividualDeviceType]: string;
} = {
  [WorkWithIndividualDeviceType.check]: 'Прибор после поверки',
  [WorkWithIndividualDeviceType.reopen]: 'Прибор после переоткрытия',
  [WorkWithIndividualDeviceType.switch]: 'Новый прибор',
};
