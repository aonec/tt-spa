import { AddHeatingStationRequest } from "myApi";

export type NewHeatingPointFormProps = {
  setCreateModalOpen?: (payload: boolean) => void;
  setEditModalOpen?: (payload: boolean) => void;
  setNewHeatingPointModalData: (payload: HeatingPoint) => void;
  formId: string;
  setInputTypeDisplayingDivShow?: (payload: boolean) => void;
  handleCreateHeatingStation: (payload: AddHeatingStationRequest) => void
};

export type HeatingPoint = {
  heatingPointType: string | null;
  heatingPointNumber: string | null;
};
