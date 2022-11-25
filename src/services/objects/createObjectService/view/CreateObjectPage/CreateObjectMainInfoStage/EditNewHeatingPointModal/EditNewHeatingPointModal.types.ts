import { HeatingPoint } from '../NewHeatingPointForm/NewHeatingPointForm.types';

export type EditNewHeatingPointModalProps = {
  setEditModalOpen: (payload: boolean) => void;
  setNewHeatingPointModalData: (payload: HeatingPoint) => void;
  isEditModalOpen: boolean;
};
