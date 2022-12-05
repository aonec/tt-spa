
export type NewHeatingStationFormProps = {
  formId: string;
  handleCreateHeatingStation: (payload: HeatingStation) => void;
};

export type HeatingStation = {
  isThermalChamber: HeatingStationType | null;
  name: string | null;
};

export enum HeatingStationType {
  ThermalChamber = 'ThermalChamber',
  CentralHeatingStation = 'CentralHeatingStation',
}
