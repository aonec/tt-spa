import { AddHeatingStationRequest } from 'myApi';

export type CreateNewHeatingStationModalProps = {
  handleCreateHeatingStation: (payload: AddHeatingStationRequest) => void;
  setModalOpen: (payload: boolean) => void;
  isModalOpen: boolean;
};
