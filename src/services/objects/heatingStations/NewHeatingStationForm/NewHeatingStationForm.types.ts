export type NewHeatingStationFormProps = {
  formId: string;
  handleCreateHeatingStation: (payload: HeatingStation) => void;
  existingCities: string[] | null;
  existingStreets: string[];
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
