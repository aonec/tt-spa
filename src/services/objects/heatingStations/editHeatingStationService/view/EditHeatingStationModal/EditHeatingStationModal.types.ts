import { HeatingStation } from 'services/objects/heatingStations/NewHeatingStationForm/NewHeatingStationForm.types';

export type EditHeatingStationModalProps = {
  handleEditHeatingStation: (params: {
    id: string;
    data: HeatingStation;
  }) => void;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  existingCities: string[] | null;
  existingStreets: string[];
};
