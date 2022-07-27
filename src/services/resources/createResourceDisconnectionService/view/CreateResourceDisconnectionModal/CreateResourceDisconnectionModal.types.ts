import {
  HeatingStationResponse,
  HousingStockShortResponse,
  ResourceDisconnectingCreateRequest,
} from 'myApi';

export type CreateResourceDisconnectionModalProps = {
  selectedCity: string;
  cities: string[] | null;
  heatingStations: HeatingStationResponse[];
  addressesFromHeatingStation: HousingStockShortResponse[];
  existingHousingStocks: ExistingStreetWithHousingStocks[];
  isOpen: boolean;
  handleClose: () => void;
  handleCreateResourceDisconnection: (
    payload: ResourceDisconnectingCreateRequest
  ) => void;
  handleSelectCity: (city: string) => void;
  handleSelectHeatingStation: (id: string) => void;
};

export type ExistingStreetWithHousingStocks = {
  title: string | null;
  key: string;
  children?: { title: string; value: string; key: string }[];
};
