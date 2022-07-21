import {
  HeatingStationResponse,
  HousingStockShortResponse,
  ResourceDisconnectingCreateRequest,
} from 'myApi';

export type CreateResourceDisconnectionFormProps = {
  cities: string[] | null;
  addresses: HousingStockShortResponse[];
  heatingStations: HeatingStationResponse[];
  selectedCity: string;
  formId: string;
  handleSubmit: (payload: ResourceDisconnectingCreateRequest) => void;
  handleSelectCity: (city: string) => void;
  handleSelectHeatingStation: (id: string) => void;
};
