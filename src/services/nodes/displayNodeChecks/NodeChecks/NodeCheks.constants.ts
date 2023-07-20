import { ENodeCheckType } from 'api/myApi';

export const CheckingActDocumentType: { [key in ENodeCheckType]: string } = {
  [ENodeCheckType.PlannedCheck]: 'Плановая',
  [ENodeCheckType.UnplannedCheck]: 'Внеплановая',
  [ENodeCheckType.AdmissionCheck]: 'Акт допуска',
};
