import { AddHeatingStationRequest } from 'myApi';
import { HeatingStation } from '../../../NewHeatingStationForm/NewHeatingStationForm.types';

export type CreateNewHeatingStationModalProps = {
  setCreateModalOpen: (payload: boolean) => void;
  setNewHeatingStationModalData: (payload: HeatingStation) => void;
  handleCreateHeatingStation: (payload: AddHeatingStationRequest) => void
};
