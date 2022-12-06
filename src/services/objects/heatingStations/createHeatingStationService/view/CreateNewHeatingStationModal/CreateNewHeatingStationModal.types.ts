import { HeatingStation } from 'services/objects/heatingStations/NewHeatingStationForm/NewHeatingStationForm.types';

export type CreateNewHeatingStationModalProps = {
  handleCreateHeatingStation: (payload: HeatingStation) => void;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  existingCities: string[] | null;
  existingStreets: string[];
};
