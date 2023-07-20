import { EClosingReason } from 'myApi';
import { UnloadingType } from '../../closedIndividualDevicesFormService.types';

export const unloadingTypesDictionary: { [key in UnloadingType]: string } = {
  [UnloadingType.AllManagingFirm]: 'Выгрузка по всей УК',
  [UnloadingType.ByHouseManagement]: 'Выгрузка по домоуправлению',
  [UnloadingType.ByAddress]: 'Выгрузка по адресу',
};

export const unloadingTypesForLabelDictionary = {
  [UnloadingType.AllManagingFirm]: 'Список УК',
  [UnloadingType.ByHouseManagement]: 'Домоуправление',
  [UnloadingType.ByAddress]: 'Адрес',
};

export const closingReasonsDictionary = {
  [EClosingReason.Manually]: 'Плановая замена',
  [EClosingReason.DeviceBroken]: 'Поломка',
  [EClosingReason.CertificateIssued]: 'Выдана справка',
  [EClosingReason.ByLetter]: 'Письмо из УК',
};
