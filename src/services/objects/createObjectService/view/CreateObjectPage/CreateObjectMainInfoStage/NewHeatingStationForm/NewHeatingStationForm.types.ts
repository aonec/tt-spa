import { AddHeatingStationRequest } from 'myApi';

export type NewHeatingStationFormProps = {
  setCreateModalOpen?: (payload: boolean) => void;
  setEditModalOpen?: (payload: boolean) => void;
  setNewHeatingStationModalData: (payload: HeatingStation) => void;
  formId: string;
  setInputTypeDisplayingDivShow?: (payload: boolean) => void;
  handleCreateHeatingStation?: (payload: AddHeatingStationRequest) => void;
};

export type HeatingStation = {
  heatingStationType: string | null;
  heatingStationNumber: string | null;
};
