import { ApartmentCreateRequest } from 'myApi';
import { PersonalNumberFormTypes } from '../components/PersonalNumberForm/PersonalNumberForm.types';

type SwitchStageForm = {
  replaceableAccountId: string;
  form: PersonalNumberFormTypes;
};

type TransferStage = { individualDeviceIdsForSwitch: number };

export type SplitPersonalNumberSubmitData = Partial<
  SwitchStageForm & ApartmentCreateRequest & TransferStage
>;
