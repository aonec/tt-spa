import { EActResourceType, EActType } from 'myApi';
import { CreateApartmentActPayload } from '../../models';

export type AddNewActFormProps = {
  addNewAct: (formValues: CreateApartmentActPayload) => void;
  selectedActType: EActType | null;
  selectedResourceType: EActResourceType | null;
  selectAct: (actType: EActType) => void;
  selectResource: (resourceType: EActResourceType) => void;
  clearForm: () => void;
};

export type AddNewActFormT = {
  registryNumber: string;
  actJobDate: string;
};
