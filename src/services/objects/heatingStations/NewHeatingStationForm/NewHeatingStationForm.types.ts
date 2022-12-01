import { AddHeatingStationRequest } from 'myApi';

export type NewHeatingStationFormProps = {
  formId: string;
  handleCreateHeatingStation?: (payload: AddHeatingStationRequest) => void;
};

export type HeatingStation = {
  heatingStationType: string | null;
  heatingStationNumber: string | null;
};

export enum HeatingStationType {
  ThermalChamber = 'ThermalChamber',
  CentralHeatingStation = 'CentralHeatingStation',
}
