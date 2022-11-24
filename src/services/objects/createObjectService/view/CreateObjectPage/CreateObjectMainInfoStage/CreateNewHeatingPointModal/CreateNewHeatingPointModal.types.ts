import { HeatingPoint } from './CreateNewHeatingPointForm/CreateNewHeatingPointForm.types';

export type CreateNewHeatingPointModalProps = {
  isCreateModalOpen: boolean;
  setCreateModalOpen: (payload: boolean) => void;
  setNewHeatingPointModalData: (payload: HeatingPoint) => void;
};
