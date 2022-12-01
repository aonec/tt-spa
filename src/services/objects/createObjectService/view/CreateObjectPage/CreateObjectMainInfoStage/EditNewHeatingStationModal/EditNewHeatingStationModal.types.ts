import { HeatingStation } from '../NewHeatingStationForm/NewHeatingStationForm.types';

export type EditNewHeatingStationModalProps = {
  setEditModalOpen: (payload: boolean) => void;
  setNewHeatingStationModalData: (payload: HeatingStation) => void;
  isEditModalOpen: boolean;
};
