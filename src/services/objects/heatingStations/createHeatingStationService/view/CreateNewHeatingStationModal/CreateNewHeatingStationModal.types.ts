import { AddHeatingStationRequest } from 'myApi';
import { HeatingStation } from '../../../NewHeatingStationForm/NewHeatingStationForm.types';

export type CreateNewHeatingStationModalProps = {
  isCreateModalOpen: boolean;
  setCreateModalOpen: (payload: boolean) => void;
  setNewHeatingStationModalData: (payload: HeatingStation) => void;
  setInputTypeDisplayingDivShow: (payload: boolean) => void;
  handleCreateHeatingStation: (payload: AddHeatingStationRequest) => void
};
