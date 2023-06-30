import { EIndividualDeviceDocumentType } from './PreviewModalForm.types';

export const IndividualDeviceDocumentsDisctionary: {
  [key in EIndividualDeviceDocumentType]: string;
} = {
  [EIndividualDeviceDocumentType.DeviceAcceptanceAct]: 'Акт выполненных работ',
  [EIndividualDeviceDocumentType.DevicePassport]: 'Паспорт прибора',
  [EIndividualDeviceDocumentType.DeviceTestCertificates]:
    'Свидетельство о проверке прибора',
};
