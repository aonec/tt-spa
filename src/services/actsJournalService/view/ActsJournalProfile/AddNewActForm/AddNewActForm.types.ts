import { Event } from 'effector';
import {
  AddApartmentActRequest,
  DocumentResponse,
  EActResourceType,
  EActType,
} from 'api/types';

export type AddNewActFormProps = {
  addNewAct: (formValues: Omit<AddApartmentActRequest, 'apartmentId'>) => void;
  isCreateLoading: boolean;
  actCreated: Event<void>;
  setModalOpen: (payload: boolean) => void;
  uploadedFile: DocumentResponse | null;
  setViewModalOpen: (payload: boolean) => void;
  handleDeleteDoc: (payload: number) => void;
  resetActAddress: () => void;
};

export type AddApartmentActFormik = Omit<
  AddApartmentActRequest,
  'apartmentId' | 'actType' | 'actResourceType'
> & {
  actType: EActType | null;
  actResourceType: EActResourceType | null;
};
