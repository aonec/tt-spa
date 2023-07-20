import { ENodeCheckType } from 'api/types';

export const CheckingActDocumentType: { [key in ENodeCheckType]: string } = {
  [ENodeCheckType.PlannedCheck]: 'Плановая',
  [ENodeCheckType.UnplannedCheck]: 'Внеплановая',
  [ENodeCheckType.AdmissionCheck]: 'Акт допуска',
};
