import { Event } from 'effector';
import { AddApartmentActRequest, EActResourceType, EActType } from 'api/myApi';

export type AddNewActFormProps = {
  addNewAct: (formValues: Omit<AddApartmentActRequest, 'apartmentId'>) => void;
  isCreateLoading: boolean;
  actCreated: Event<void>;
};

export type AddApartmentActFormik = Omit<
  AddApartmentActRequest,
  'apartmentId' | 'actType' | 'actResourceType'
> & {
  actType: EActType | null;
  actResourceType: EActResourceType | null;
};
