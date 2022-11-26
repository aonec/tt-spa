import { HeatingPoint } from '../NewHeatingPointForm/NewHeatingPointForm.types';

export type CreateNewHeatingPointModalProps = {
  isCreateModalOpen: boolean;
  setCreateModalOpen: (payload: boolean) => void;
  setNewHeatingPointModalData: (payload: HeatingPoint) => void;
  setInputTypeDisplayingDivShow: (payload: boolean) => void;
};
