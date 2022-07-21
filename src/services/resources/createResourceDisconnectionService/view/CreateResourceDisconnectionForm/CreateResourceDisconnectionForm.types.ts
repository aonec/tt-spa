import {
  EResourceDisconnectingType,
  EResourceType,
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

export type CreateResourceDisconnectionFormTypes = {
  resource: EResourceType | null;
  disconnectingType: EResourceDisconnectingType | null;
  sender: string;

  heatingStationId?: string | null;
  housingStockIds: number[];

  startDate: string;
  startHour: string;

  endDate: string;
  endHour: string;
};
