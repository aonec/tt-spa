import {
  HeatingStationResponse,
  HousingStockShortResponse,
  ResourceDisconnectingCreateRequest,
} from 'myApi';

export type CreateResourceDisconnectionModalProps = {
  selectedCity: string;
  cities: string[] | null;
  heatingStations: HeatingStationResponse[];
  addresses: HousingStockShortResponse[];
  isOpen: boolean;
  handleClose: () => void;
  handleCreateResourceDisconnection: (
    payload: ResourceDisconnectingCreateRequest
  ) => void;
  handleSelectCity: (city: string) => void;
  handleSelectHeatingStation: (id: string) => void;
};
