import { HeatingStationResponse } from 'api/types';

export type NewHeatingStationFormProps = {
  formId: string;
  handleCreateHeatingStation?: (payload: HeatingStation) => void;
  handleEditHeatingStation?: (params: {
    id: string;
    data: HeatingStation;
  }) => void;
  existingCities: string[] | null;
  existingStreets: string[];
  currentHeatingStationId?: string | null;
  openedHeatingStationData?: HeatingStationResponse | null;
  isEdit?: boolean;
};

export type HeatingStation = {
  isThermalChamber: HeatingStationType | null;
  name: string | null;
  address: { city: string | null; street: string; number: string | null };
};

export enum HeatingStationType {
  ThermalChamber = 'ThermalChamber',
  CentralHeatingStation = 'CentralHeatingStation',
}
